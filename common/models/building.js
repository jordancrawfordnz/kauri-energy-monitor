module.exports = function(Building) {
	Building.disableRemoteMethod('__updateById__exports');

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
				console.log('about to find building');
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
					var amountPerPage = 10;

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
							chargeEfficiency : 0.8
						};
						// For each reading.
							// TODO: pull out as a seperate function.
						readings.forEach(function(reading) {
							var buildingPower = reading.values[building.buildingPowerSensorId];
							var batteryVoltage = reading.values[building.batteryVoltageSensorId];
							var batteryCurrent = reading.values[building.batteryCurrentSensorId];

							console.log('Timestamp: ' + reading.timestamp);
							console.log('Building power: ' + buildingPower + ' W');
							console.log('Battery voltage: ' + batteryVoltage + ' V');
							console.log('Battery current: ' + batteryCurrent + ' A');


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

							// If a State reading point or midnight point has passed since the last reading.
								// Record the State.

							// Update the current State as appropriate.

							lastReading = reading;

								// TODO: Be aware of divide by 0!
							console.log('SoC: ' + ((state.currentChargeLevel / state.batteryCapacity) * 100).toFixed(2) + '%');

							console.log(state);
						});
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
};
