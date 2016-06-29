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
		{ numberOfSuccessfulReadings : [the count of successful records], numberOfFailedReadings : [the count of failed records] }
*/
StateOfCharge.processAllReadings = function(building) {
	var amountPerPage = 10000;
	var Reading = app.models.Reading;
	var startTime = Math.floor(Date.now() / 1000);
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
				
				processPage(building, bridge, 0, totalPages, null, StateOfCharge.getStateTemplate(building)).then(function(result) {
					var finishTime = Math.floor(Date.now() / 1000);
					result.totalTime = finishTime - startTime;
					resolve(result);
				}, reject);
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
							numberOfSuccessfulReadings : readings.length - processResult.numberOfFailedReadings,
							numberOfFailedReadings: processResult.numberOfFailedReadings
						};
						if (page < totalPages - 1) {
							// Provide details from this page to the next page.
							processPage(building, bridge, page + 1, totalPages, processResult.lastReading, processResult.currentState).then(function(recurseResult) {
								// Add to the result of the next page.
								pageResult.numberOfSuccessfulReadings += recurseResult.numberOfSuccessfulReadings;
								pageResult.numberOfFailedReadings += recurseResult.numberOfFailedReadings;
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
	var numberOfFailedReadings = 0;
	function runProcessReading(readingIndex, lastReading, currentState) {
		return new Promise(function(resolve, reject) {
			// Base case.
			if (readingIndex >= readings.length) {
				resolve(currentState);
			} else {
				var currentReading = readings[readingIndex];
				
				// Get this result.
				StateOfCharge.processReading(building, currentReading, lastReading, currentState).then(function(newState) {
					// Run the next value with the result.
					runProcessReading(readingIndex + 1, currentReading, newState).then(function(newState) {
						// The result from lower levels.
						resolve(newState);
					}, reject);
				}, function() {
					// This process failed. Run the next reading with the same data.
					numberOfFailedReadings++;
					runProcessReading(readingIndex + 1, lastReading, currentState).then(function(newState) {
						// The result from lower levels.
						resolve(newState);
					}, reject);
				});
			}
		});
	}

	return runProcessReading(0, initialLastReading, startState).then(function(finishState) {
		return {
			lastReading: readings[readings.length - 1],
			currentState: finishState,
			numberOfFailedReadings: numberOfFailedReadings
		};
	});
};

/*
Provides information on the state of the system based on the battery voltage and house load.
	building: the building the battery is for.
	currentState: the current state of the system.
	timestamp: the current reading's timestamp.
	batteryVoltage: the battery voltage
	buildingPower: the amount of power consumed by the building
*/
StateOfCharge.analyseVoltage = function(building, currentState, timestamp, batteryVoltage, buildingPower) {
	// TODO: How to determine if inverter output is off?
		// Need battery in place in field so readings continue.
		// Power sensor un-reachable, however could be any sort of failure.
		// Might be best to look at the battery load current?

	/* TODO:
		Use this to determine load state.
		e.g.: could tell us:
			- if experencing low battery level
			- if experiencing high load
			- if the low voltage situation has been happening for a while.
			- provide the time that the situation has been happening for.

		The caller can determine how to use this information.

		How do we treat these situations:
			- High power could be the cause but the voltage level may not have adjusted, don't want to call this low voltageLowSinc
				i.e.: could classify event
			- Could be a low voltage but had one or two readings of high power.

		TODO: Add triggers for low battery level.
	*/
	var toReturn = {
		lowVoltage : false,
		lowBatteryLevel : false,
		lowBatteryLevelTrigger : false,
		highLoad : false
	};

	toReturn.lowVoltage = batteryVoltage < building.lowVoltageLevel; // Is the battery voltage too low.
	toReturn.highLoad = buildingPower > building.highPowerThreshold; // If the load excessive?

	if (toReturn.lowVoltage && !toReturn.highLoad) {
		toReturn.lowBatteryLevel = true;
		if (!currentState.batteryLevelLowSince) {
			// If not seen low voltage previously, set the state.
			currentState.batteryLevelLowSince = timestamp;
		}

		// Has enough time passed since voltage low to mean the battery is empty.
		if (timestamp - currentState.batteryLevelLowSince >= building.lowVoltageTriggerTime) {
			toReturn.lowBatteryLevelTrigger = true;
		}
	} else {
		currentState.batteryLevelLowSince = undefined;
	}

	return toReturn;
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

		// TODO: Remove. Fix for lack of building power.
		if (buildingPower === undefined) {
			var buildingVoltage = reading.values['572023553916fd9b1ac7ba4d'];
			var buildingCurrent = reading.values['5720235d3916fd9b1ac7ba4e'];
			if (buildingVoltage !== undefined && buildingCurrent !== undefined) {
				buildingPower = batteryVoltage * batteryCurrent;
			}
		}

		if (buildingPower === undefined || batteryVoltage === undefined || batteryCurrent === undefined) {
			reject('Essential value is null.');
			return;
		}
		
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

		// Check for battery empty.
		var batteryState = StateOfCharge.analyseVoltage(building, currentState, reading.timestamp, batteryVoltage, buildingPower);	


		if (!currentState.emptyLevelEstablished) { // Empty level not established, in preliminary phase.
			// If power has entered the battery, the charge efficiency is taken into account.
			if (powerChange > 0) {
				powerChange = powerChange * currentState.chargeEfficiency;
			}

			// Update the current charge.
			currentState.currentChargeLevel += powerChange;

			// If the current charge level drops below zero, increase the battery capacity.
			if (currentState.currentChargeLevel < 0) {
				currentState.currentChargeLevel = 0;
				currentState.batteryCapacity += Math.abs(powerChange);
			}

			// If the current charge level is over the battery capacity, increase the battery capacity.
			if (currentState.currentChargeLevel > currentState.batteryCapacity) {
				currentState.batteryCapacity += Math.abs(powerChange);
			}

			if (batteryState.lowBatteryLevelTrigger) {
				currentState.emptyLevelEstablished = true; // The level has been established so can go to the operational phase.
				currentState.batteryCapacity -= currentState.currentChargeLevel; // Adjust the battery capacity to be less as the charge level is less than expected.
				currentState.currentChargeLevel = 0; // Make the charge level zero as we know the battery is empty.
				StateOfCharge.recordRecalibration(building, reading.timestamp, 'PreliminaryPhaseB0Hit');
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