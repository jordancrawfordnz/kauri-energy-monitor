var Promise = require('promise');
var app = require('../server/server');

var StateOfCharge = {};
module.exports = StateOfCharge;

var produceStateEvery = 10*60; // ten minutes

// Require that the state production will be the same times each day.
if (3600*24 % produceStateEvery !== 0) {
	console.log('Building States should be computed by a number that divides the number of seconds in a day.')
	process.exit();
}

// Returns a boolean. True if a state record should be saved.
	// timeSinceLastReading: The number of seconds since the last reading.
	// timestamp: The timestamp of the reading being processed.
StateOfCharge.shouldRecordState = function(timeSinceLastReading, timestamp) {
	var outBy = timestamp % produceStateEvery;

	// Either the timestamp is perfectly on a record state time or the record state
	return outBy === 0 || outBy < timeSinceLastReading;
};

// Creates a recalibration using the specified parameters. Returns a promise.
StateOfCharge.recordRecalibration = function(building, timestamp, type) {
	var Recalibration = app.models.Recalibration;
	return new Promise(function(resolve, reject) {
		Recalibration.create({
			timestamp : timestamp,
			reason : type,
			buildingId : building.id
		}, function(error, recalibration) {
			if (error) {
				reject(error);	
			} else {
				resolve(recalibration);
			}
		});
	});
};

// Returns a template for a blank state object.
StateOfCharge.getStateTemplate = function(building) {
	return {
		energyInSinceLastC0 : 0,
		energyOutSinceLastC0 : 0,
		batteryCapacity : 0,
		emptyLevelEstablished : false,
		currentChargeLevel : 0,
		chargeEfficiency : 0.8,
		buildingId : building.id
	};
}

/*
Processes all readings.
	building: The building to get readings for.
	Returns: A Promise which Resolves:
		{ numberOfRecords : [the count of records] }
*/
StateOfCharge.processAllReadings = function(building) {
	var amountPerPage = 10000;
	var Reading = app.models.Reading;

	return new Promise(function(resolve, reject) {
		// TODO: Use only one bridge for a building.
		var bridge = building.bridges[0];
		
		// Determine how many pages.
		Reading.count({
			bridgeId : bridge.id
		}, function(error, count) {
			if (error) {
				reject(error);
			} else {
				var totalPages = Math.ceil(count / amountPerPage);
				processPage(building, bridge, 0, totalPages, null, StateOfCharge.getStateTemplate(building)).then(resolve, reject);
			}
		});
	});

	// Fetch the page's results, then process the reading.
	function processPage(building, bridge, page, totalPages, lastReading, state) {
		return new Promise(function(resolve, reject) {
			// Fetch readings.
			Reading.find({
				order: 'timestamp asc',
				skip: page * amountPerPage,
				limit: amountPerPage,
				where: {bridgeId : bridge.id}
			}, function(error, readings) {
				if (error) {
					reject(error);
				} else {
					// Process the readings.
					StateOfCharge.processReadingsSerially(building, readings, lastReading, state).then(function(processResult) {
						var pageResult = {
							numberOfRecords : readings.length
						};
						if (page < totalPages) {
							// Provide details from this page to the next page.
							processPage(building, bridge, page + 1, totalPages, processResult.lastReading, processResult.currentState).then(function(recurseResult) {
								// Add to the result of the next page.
								pageResult.numberOfRecords += recurseResult.numberOfRecords;
								resolve(pageResult);
							}, reject);
						} else {
							// Base case, last page so just return this page's result.
							resolve(pageResult);
						}
					}, reject);
				}
			});
		});
	}
};

/*
Process an entire array of readings serially.
	building: The building all the readings belong to.
	readings: The array of readings to process. The array order represents the order of processing.
	initialLastReading: The last reading before the block of serially processed readings.
	startState: The current state before processing readings.

	Returns: A Promise which Resolves:
		{ lastReading : [the last reading processed], currentState : [the current state after processing] }
*/
StateOfCharge.processReadingsSerially = function(building, readings, initialLastReading, startState) {
	// Why serially? The state relies on the previous values state.
		// As processReadings returns a promise, processReading could perform additional async tasks.

	function runProcessReading(readingIndex, currentState) {
		return new Promise(function(resolve, reject) {
			// Base case.
			if (readingIndex >= readings.length) {
				resolve(currentState);
			} else {
				var currentReading = readings[readingIndex];
				var lastReading = readings[readingIndex - 1];

				// Get this result.
				StateOfCharge.processReading(building, currentReading, lastReading, currentState).then(function(newState) {
					// Run the next value with the result.
					runProcessReading(readingIndex + 1, newState).then(function(newState) {
						// The result from lower levels.
						resolve(newState);
					}, reject);
				}, reject);
			}
		});
	}

	return runProcessReading(0, startState).then(function(finishState) {
		return {
			lastReading: readings[readings.length - 1],
			currentState: finishState
		};
	});
};

/*
Processes a single reading.
	building: The building this reading belongs to.
	reading: The reading to process.
	lastReading: The reading immediately before this one. Undefined if this is the first reading.
	currentState: The current state of charge (allowed to edit, should clone if don't want edited).
	Returns: A promise. On resolve, returns the new state.
*/
StateOfCharge.processReading = function(building, reading, lastReading, currentState) {
	var State = app.models.State;
	return new Promise(function(resolve, reject) {
		var buildingPower = reading.values[building.buildingPowerSensorId];
		var batteryVoltage = reading.values[building.batteryVoltageSensorId];
		var batteryCurrent = reading.values[building.batteryCurrentSensorId];

		var secondsSinceLastReading = 0;
		if (lastReading) {
			secondsSinceLastReading = reading.timestamp - lastReading.timestamp;
		}

		var powerChange = (batteryVoltage * batteryCurrent * secondsSinceLastReading) / 3600;
		/*
			The power change is expressed in Watt Hours.
				A Watt Hour is 3600J.
				The power (in Watts, P=IV) multiplied by the time in seconds gets the amount of change in Joules over the time gap.
				Divide the number of Joules by 3600 to get the amount of change in Watt Hours.
		*/ 

		// Count the power change towards the power in and out.
		if (powerChange > 0) { // A positive power change represents overall entry of power into the system
			currentState.energyInSinceLastC0 += powerChange;
			currentState.currentChargeLevel += currentState.chargeEfficiency * powerChange; // the battery charge level has increased

			if (currentState.currentChargeLevel > currentState.batteryCapacity) { // Expand the capacity to the current charge level.
				currentState.batteryCapacity = currentState.currentChargeLevel;
				StateOfCharge.recordRecalibration(building, reading.timestamp, 'BatteryCapacityHigherThan100');
				// TODO: Calibration?
			}
		} else { // A negative power change represents power leaving the system.
			currentState.energyOutSinceLastC0 -= powerChange; // (double negative so adds to power out)

				// TODO: This might be part of the initial calibration phase, need new changes to the algorithm.
			if (currentState.currentChargeLevel + powerChange < 0) { // Increase the battery capacity when discharging below 0.
				currentState.currentChargeLevel = 0;
				currentState.batteryCapacity -= powerChange;
					// TODO: Calibration?
			} else {
				currentState.currentChargeLevel += powerChange; // the battery charge level has decreased (double negative so decreases charge level).
			}
		}

		// If the state needs to be recorded, then record it.
		if (StateOfCharge.shouldRecordState(secondsSinceLastReading, reading.timestamp)) {
			// Record the State.
			currentState.timestamp = reading.timestamp;
			State.create(currentState, function(error) {
				if (error) {
					reject();
				} else {
					resolve(currentState);
				}
			});
		} else {
			// Resolve the state immediately if it doesn't need to be saved.
			resolve(currentState);
		}
	});
};