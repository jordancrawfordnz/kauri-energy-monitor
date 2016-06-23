module.exports = function(Building) {
	Building.disableRemoteMethod('__updateById__exports');

	var produceStateEvery = 10*60; // ten minutes

	function shouldRecordState(timeSinceLastReading, timestamp) {
		var outBy = timestamp % produceStateEvery;

		// Either the timestamp is perfectly on a record state time or the record state
		return outBy === 0 || outBy < timeSinceLastReading;
	};
	
	// Require that the state production will be the same times each day.
	if (3600*24 % produceStateEvery !== 0) {
		console.log('Building States should be computed by a number that divides the number of seconds in a day.')
		process.exit();
	}

	Building.latestState = function(id, cb) {
		Building.app.models.State.findOne({
			where: {
				buildingId : id
			},
			order: 'timestamp DESC'
		}, function(error, state) {
			if (error) {
				cb(error);
			} else {
				cb(null, state);
			}
		});
	};

	/*
		Re-generates the entire state of the system by:
			- deleting all existing State's for the building
			- re-process all Readings in the order it happened
				- create State's at their relevant intervals and perform daily adjustments
	*/
	Building.regenerateState = function(id, cb) {
		var app = Building.app;
		var State = app.models.State;
		var Recalibration = app.models.Recalibration;
		var Reading = app.models.Reading;

		// Delete all existing Recalibration points for the Building.
		Recalibration.destroyAll({
			buildingId : id
		}, function(destroyRecalibrationError) {
			if (destroyRecalibrationError) {
				cb("Failed while destroying Recalibration's.");
				console.log(destroyRecalibrationError);
				return;
			}

			// Delete all existing States for the building.
			State.destroyAll({
				buildingId : id
			}, function(destroyStateError, info) {
				if (destroyStateError) {
					cb("Failed deleting states.");
					console.log(destroyStateError);
					return;
				}
				// Get the Building with bridge.
				Building.findById(id, {
					include : 'bridges'
				}, function(getBuildingError, building) {
					if (getBuildingError) {
						cb("Failed to get building.");
						console.log(getBuildingError);
						return;
					}
					var building = building.toJSON(); // make the building a pure JSON object.

					// TODO: Use only one bridge for a building.
					var bridge = building.bridges[0];
					
					// TODO: itterate through all pages.
					var page = 0;
					var amountPerPage = 100000;

					// Fetch readings.
					Reading.find({
						order: 'timestamp asc',
						skip: page*amountPerPage,
						limit: amountPerPage,
						where: {bridgeId : bridge.id}
					}, function(getReadingsError, readings) {
						if (getReadingsError) {
							cb("Failed to get readings.");
							console.log('Page: ' + page);
							console.log(getReadingsError);
							return;
						}

						var lastReading;

							// TODO: Fill in some defaults of the state, e.g.: a default charge efficiency.
						var state = {
							powerIn : 0,
							powerOut : 0,
							batteryCapacity : 0,
							currentChargeLevel : 0,
							chargeEfficiency : 0.8,
							buildingId : building.id
						};
						// For each reading.
							// TODO: pull out as a seperate function.
						readings.forEach(function(reading) {
							var buildingPower = reading.values[building.buildingPowerSensorId];
							var batteryVoltage = reading.values[building.batteryVoltageSensorId];
							var batteryCurrent = reading.values[building.batteryCurrentSensorId];

							var secondsSinceLastReading = 0;
							if (lastReading) {
								secondsSinceLastReading = reading.timestamp - lastReading.timestamp;
							}

							var powerChange = (batteryVoltage * batteryCurrent *secondsSinceLastReading) / 3600;
							/*
								The power change is expressed in Watt Hours.
									A Watt Hour is 3600J.
									The power (in Watts, P=IV) multiplied by the time in seconds gets the amount of change in Joules over the time gap.
									Divide the number of Joules by 3600 to get the amount of change in Watt Hours.
							*/ 

							// Count the power change towards the power in and out.
							if (powerChange > 0) { // A positive power change represents overall entry of power into the system
								state.powerIn += powerChange;
								state.currentChargeLevel += state.chargeEfficiency * powerChange; // the battery charge level has increased

								if (state.currentChargeLevel > state.batteryCapacity) { // Expand the capacity to the current charge level.
									state.batteryCapacity = state.currentChargeLevel;
									Recalibration.create({
										timestamp : reading.timestamp,
										reason : 'BatteryCapacityHigherThan100',
										buildingId : building.id
									}, function(error) {
										if (error) {
											console.log('Error creating Recalibration.');
											console.log(error);
											return;
										}
									});
									// TODO: Calibration?
								}
							} else { // A negative power change represents power leaving the system.
								state.powerOut -= powerChange; // (double negative so adds to power out)

									// TODO: This might be part of the initial calibration phase, need new changes to the algorithm.
								if (state.currentChargeLevel + powerChange < 0) { // Increase the battery capacity when discharging below 0.
									state.currentChargeLevel = 0;
									state.batteryCapacity -= powerChange;
										// TODO: Calibration?
								} else {
									state.currentChargeLevel += powerChange; // the battery charge level has decreased (double negative so decreases charge level).
								}
							}

							// If the state needs to be recorded, then record it.
							if (shouldRecordState(secondsSinceLastReading, reading.timestamp)) {
								// Record the State.
								state.timestamp = reading.timestamp;
								State.create(state, function(error) {
									if (error) {
										console.log('Error creating State');
										console.log(state);
									}
								});
							}

							lastReading = reading;
						});

						cb('Done');
					});
				});
			});
		});
	};

	Building.remoteMethod(
		'regenerateState',
		{
			http: {path: '/:id/regeneratestate', verb: 'post'},
		    accepts: [
		    	{arg: 'id', type: 'string', required: true}
		    ]
		}
	);

	Building.remoteMethod('latestState',
	{
		accepts: {arg: 'id', type: 'string', required: true},
		http: {path: '/:id/lateststate', verb: 'get'},
		returns: {type: 'object', root: true}
	});
};
