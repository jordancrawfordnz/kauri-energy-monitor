var Promise = require('promise');
var app = require('../server/server');
var moment = require('moment');
var StateOfCharge = require('./stateofcharge.js');
var EnergyFlow = require('./energyflow.js');
var ProcessingHelper = require('./processinghelper.js');
var StatePredictions = require('./statepredictions.js');

var ReadingProcessing = {};
module.exports = ReadingProcessing;

var produceStateEvery = 10*60; // ten minutes

// Require that the state production will be the same times each day.
if (3600*24 % produceStateEvery !== 0) {
	console.log('Building States should be computed by a number that divides the number of seconds in a day.')
	process.exit();
}

// Returns a boolean. True if a state record should be saved.
	// timeSinceLastReading: The number of seconds since the last reading.
	// timestamp: The timestamp of the reading being processed.
ReadingProcessing.shouldRecordState = function(timeSinceLastReading, timestamp) {
	var outBy = timestamp % produceStateEvery;

	// Either the timestamp is perfectly on a record state time or the record state time was missed.
	return outBy === 0 || outBy < timeSinceLastReading;
};

// Returns a template for a blank state object.
ReadingProcessing.getStateTemplate = function(building) {
	return {
		previousEnergyInSinceLastC0 : 0,
		previousEnergyOutSinceLastC0 : 0,
		currentEnergyInSinceLastC0 : 0,
		currentEnergyOutSinceLastC0 : 0,
		batteryCapacity : 0,
		emptyLevelEstablished : false,
		currentChargeLevel : 0,
		chargeEfficiency : 0.8,
		buildingId : building.id,
		isBatteryCharging : false,
		sources : {},
		consumption : {
			hourlyTotal : 0,
			dailyTotal : 0
		},
		maximumPrelimPhaseChargeLevel : 0
	};
}

// Gets the where filter for state of charge queries.
ReadingProcessing.getReadingWhereFilter = function(building, bridgeId) {
	var whereFilter = {
		and : []
	};
	whereFilter.and.push({
		bridgeId : bridgeId
	});
	if (building.onlyProcessAfter) {
		whereFilter.and.push({
			timestamp : {gte : building.onlyProcessAfter}
		});
	}

	if (building.onlyProcessUntil) {
		whereFilter.and.push({
			timestamp : {lt : building.onlyProcessUntil}
		});
	}
	return whereFilter;
};

/*
Processes all readings.
	building: The building to get readings for.
	Returns: A Promise which Resolves:
		{ numberOfSuccessfulReadings : [the count of successful records], numberOfFailedReadings : [the count of failed records] }
*/
ReadingProcessing.processAllReadings = function(building) {
	var State = app.models.State;
	var Building = app.models.Building;

	var amountPerPage = 10000;
	var Reading = app.models.Reading;
	var startTime = Math.floor(Date.now() / 1000);
	return new Promise(function(resolve, reject) {
		// TODO: Use only one bridge for a building.
		var bridge = building.bridges[0];

		var currentState = ReadingProcessing.getStateTemplate(building);
		processPage(building, bridge, 0, null, currentState).then(function(result) {
			var finishTime = Math.floor(Date.now() / 1000);
			result.startTime = startTime;
			result.finishTime = finishTime;
			result.totalTime = finishTime - startTime;

			if (result.numberOfSuccessfulReadings === 0) {
				// Don't save the current state if there are no successful readings.
				resolve(result);
				return;
			}

			// Save the current state and link it to the building.
			Building.findById(building.id, function(getBuildingError, buildingInstance) {
				if (getBuildingError) {
					reject(getBuildingError);
				} else {
					State.create(currentState, function(createStateError, savedState) {
						if (createStateError) {
							reject(createStateError);
						} else {
							// Update the building to use this state for the current state.
							buildingInstance.updateAttribute('currentStateId', savedState.id, function(updateBuildingError, updatedBuilding) {
		   						if (updateBuildingError) {
		   							reject(updateBuildingError);
		   						} else {
		   							resolve(result);
		   						}
		   					});
						}
					});
				}
			});
		}, reject);
	});

	// Fetch the page's results, then process the reading.
	function processPage(building, bridge, page, lastReading, state) {
		return new Promise(function(resolve, reject) {
			// Fetch readings.
			Reading.find({
				order: 'timestamp asc',
				skip: page * amountPerPage,
				limit: amountPerPage,
				where: ReadingProcessing.getReadingWhereFilter(building, bridge.id)
			}, function(error, readings) {
				if (error) {
					reject(error);
				} else {
					// Process the readings.
					ReadingProcessing.processReadingsSerially(building, readings, lastReading, state).then(function(processResult) {
						var pageResult = {
							numberOfSuccessfulReadings : readings.length - processResult.numberOfFailedReadings,
							numberOfFailedReadings: processResult.numberOfFailedReadings
						};
						if (readings.length === 0) {
							// If this is a blank page, we are at the end so just return this page's result.
							resolve(pageResult);
						} else {
							// Provide details from this page to the next page.
							processPage(processResult.building, bridge, page + 1, processResult.lastReading, processResult.currentState).then(function(recurseResult) {
								// Add to the result of the next page.
								pageResult.numberOfSuccessfulReadings += recurseResult.numberOfSuccessfulReadings;
								pageResult.numberOfFailedReadings += recurseResult.numberOfFailedReadings;
								resolve(pageResult);
							}, reject);
						}
					}, reject);
				}
			});
		});
	}
};

// Updates the stored future states by clearing the existing states and adding new ones.
ReadingProcessing.updateFutureStates = function(futureStates) {
	var FutureState = app.models.FutureState;
	return new Promise(function(resolve, reject) {
		// Clear all future states.
		FutureState.destroyAll(function(destroyAllError) {
			if (destroyAllError) {
				reject(destroyAllError);
			} else {
				// Add all future states.
				FutureState.create(futureStates, function(createError, createResult) {
					if (createError) {
						reject(createError);
					} else {
						resolve(createResult);
					}
				});
			}
		});
	});
};

// Updates a JSON building object including energy sources but only if flagged as needing a save.
	// Returns a promise that resolves with an updated JSON building including energy sources.
ReadingProcessing.updateFullBuildingIfNeeded = function(building) {
	var Building = app.models.Building;
	var EnergySource = app.models.EnergySource;
	return new Promise(function(resolve, reject) {
		var updatePromises = [];
		if (building.needsSave) {
			updatePromises.push(new Promise(function(saveBuildingResolve, saveBuildingReject) {
				delete building.needsSave; // delete the 'needsSave' flag from the building.
				Building.upsert(building, function(saveBuildingError) {
					if (saveBuildingError) {
						saveBuildingReject(saveBuildingError);
					} else {
						saveBuildingResolve();
					}
				});
			}));
		}

		// Check if any of the energy sources need an update.
		building.energySources.forEach(function(energySource) {
			if (energySource.needsSave) {
				updatePromises.push(new Promise(function(saveEnergySourceResolve, saveEnergySourceReject) {
					delete energySource.needsSave;
					EnergySource.upsert(energySource, function(saveEnergySourceError) {
						if (saveEnergySourceError) {
							saveEnergySourceReject(saveEnergySourceError);
						} else {
							saveEnergySourceResolve();
						}
					});
				}));
			}
		});

		// Once all buildings and energy sources have saved.
		Promise.all(updatePromises).then(function() {
			// Get a full copy of the building with energy sources.
			Building.findById(building.id, {
				include : ['energySources']
			}, function(getBuildingError, savedBuilding) {
				if (getBuildingError) {
					reject(getBuildingError);
				} else {
					resolve(savedBuilding.toJSON());
				}
			});
		}, reject);
	});
};

/*
Process an entire array of readings serially.
	building: The building all the readings belong to.
	readings: The array of readings to process. The array order represents the order of processing.
	initialLastReading: The last reading before the block of serially processed readings.
	startState: The current state before processing readings.

	Returns: A Promise which Resolves:
		{ lastReading : [the last reading processed],
		  currentState : [the current state after processing],
		  building : [the building instance] }
*/
ReadingProcessing.processReadingsSerially = function(building, readings, initialLastReading, startState) {
	// Why serially? The state relies on the previous values state.
		// As processReadings returns a promise, processReading could perform additional async tasks.
	var numberOfFailedReadings = 0;
	function runProcessReading(readingIndex, lastReading, currentProcessResult) {
		return new Promise(function(resolve, reject) {
			// Base case.
			if (readingIndex >= readings.length) {
				resolve(currentProcessResult);
			} else {
				var currentReading = readings[readingIndex];

				// Get this result.
				ReadingProcessing.processReading(building, currentReading, lastReading, currentProcessResult).then(function(processReadingResult) {
					// Run the next value with the result.
					runProcessReading(readingIndex + 1, currentReading, processReadingResult).then(function(processReadingResult) {
						// The result from lower levels.
						resolve(processReadingResult);
					}, reject);
				}, function() {
					// This process failed. Run the next reading with the same data.
					numberOfFailedReadings++;
					runProcessReading(readingIndex + 1, lastReading, currentProcessResult).then(function(processReadingResult) {
						// The result from lower levels.
						resolve(processReadingResult);
					}, reject);
				});
			}
		});
	}

	return new Promise(function(resolve, reject) {
		runProcessReading(0, initialLastReading, {
			state : startState
		}).then(function(processReadingResult) {
			var toReturn = {
				lastReading: readings[readings.length - 1],
				currentState: processReadingResult.state,
				numberOfFailedReadings: numberOfFailedReadings
			};
			var updateFutureStatesPromise;
			if (processReadingResult.futureStates) {
				updateFutureStatesPromise = ReadingProcessing.updateFutureStates(processReadingResult.futureStates);
			} else {
				updateFutureStatesPromise = Promise.resolve();
			}

			if (numberOfFailedReadings == readings.length) {
				reject('All readings failed.');
				return;
			}

			updateFutureStatesPromise.then(function() {
				ReadingProcessing.updateFullBuildingIfNeeded(building).then(function(updatedBuilding) {
					toReturn.building = updatedBuilding;
					resolve(toReturn);
				}, reject);
			}, reject);
		}, reject);
	});
};

/*
Provides information on the state of the system based on the battery voltage and house load.
	building: the building the battery is for.
	currentState: the current state of the system.
	timestamp: the current reading's timestamp.
	sensorData: the set of sensor values to use from the reading
*/
ReadingProcessing.analyseVoltage = function(building, currentState, timestamp, sensorData) {
	var batteryVoltage = sensorData.now.batteryVoltage;
	var buildingPower = sensorData.now.buildingPower;
	var inverterCurrent = sensorData.now.loadCurrent;

	var toReturn = {
		lowVoltage : false,
		lowBatteryLevel : false,
		lowBatteryLevelTrigger : false,
		highLoad : false
	};

	toReturn.lowVoltage = batteryVoltage < building.lowVoltageLevel; // Is the battery voltage too low.
	toReturn.highLoad = buildingPower !== undefined && buildingPower > building.highPowerThreshold; // If the load excessive?

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

	// If the inverter current is low, trigger low battery event.
	if (inverterCurrent !== undefined && inverterCurrent <= 0.1) {
		toReturn.lowBatteryLevelTrigger;
	}

	return toReturn;
};

// Checks a building has the configuration required to allow reading processing.
	// Returns true if it does.
ReadingProcessing.buildingHasProcessingParams = function(building) {
	var hasRequiredFields = true;

	var fieldsToCheck = [
		"lowVoltageTriggerTime",
		"lowVoltageLevel",
		"dailyAgingPercentage",
		"tolerancePercentage",
		"highPowerThreshold",
		"recalculateChargeEfficiencyCapacityMultiplier",
		"houseConsumptionColour",
		"batteryVoltageSensorId",
		"batteryCurrentSensorId",
		"buildingPowerSensorId",
		"loadCurrentSensorId"
	];

	for (var i = 0; i < fieldsToCheck.length; i++) {
		var fieldValue = building[fieldsToCheck[i]];
		if (fieldValue === undefined || fieldValue === null) {
			hasRequiredFields = false;
			break;
		}
	}

	return hasRequiredFields;
};

/*
Populates an array of sensor data filled in with current reading and last reading's data, including user specified energy sources.
	Returns a Promise that resolves an object of the form:
	{
		now : { [sensor data] },
		lastReading : { [sensor data] }
	}

	Sensor data contains:
		- buildingPower
		- batteryVoltage
		- loadCurrent
		- energySourceCurrents (an object where the key is the energy source ID)
*/
ReadingProcessing.getSensorData = function(reading, lastReading, building) {
	return new Promise(function(resolve, reject) {
		var sensorData = {
			now : {
				buildingPower : reading.values[building.buildingPowerSensorId],
				batteryVoltage : reading.values[building.batteryVoltageSensorId],
				batteryCurrent : reading.values[building.batteryCurrentSensorId],
				loadCurrent : reading.values[building.loadCurrentSensorId],
				energySourceCurrents : {}
			},
			lastReading : {
				buildingPower : 0,
				batteryVoltage : 0,
				batteryCurrent : 0,
				loadCurrent : 0,
				energySourceCurrents : {}
			}
		};

		// Fill in data for the last reading if we have it.
		if (lastReading) {
			sensorData.lastReading.buildingPower = lastReading.values[building.buildingPowerSensorId];
			sensorData.lastReading.batteryVoltage = lastReading.values[building.batteryVoltageSensorId];
			sensorData.lastReading.batteryCurrent = lastReading.values[building.batteryCurrentSensorId];
			sensorData.lastReading.loadCurrent = lastReading.values[building.loadCurrentSensorId];
		}

		// Determine the other source.
		var otherCurrent = sensorData.now.batteryCurrent - sensorData.now.loadCurrent;
		var lastReadingOtherCurrent = sensorData.lastReading.batteryCurrent - sensorData.lastReading.loadCurrent;
		var otherSourceId;

		// For each energy source, store the energy source ID and its current.
		var haveAllReadings = true;
		building.energySources.forEach(function(energySource) {
			if (!energySource.currentSensorId) {
				// If the sensor isn't defined then we are missing some data we need.
				haveAllReadings = false;
			} else if (energySource.currentSensorId === ProcessingHelper.OTHER_SENSOR_ID) {
				otherSourceId = energySource.id; // fill this in later once the other current is known.
			} else {
				var sensorIdToUse;
				if (energySource.currentSensorId === ProcessingHelper.CHARGER_SENSOR_ID) {
					// Fill in from the load current sensor.
					sensorIdToUse = building.loadCurrentSensorId;
				} else {
					sensorIdToUse = energySource.currentSensorId;
				}

				// Get the current values for this sensor now and in the past.
				var currentReading = reading.values[sensorIdToUse];
				if (currentReading < 0) {
					currentReading = 0;
				}

				if (currentReading === undefined) { // (only requires the 'now' reading to be present)
					haveAllReadings = false;
					return;
				}

				var lastCurrentReading = 0;
				if (lastReading) {
					lastCurrentReading = lastReading.values[sensorIdToUse];
					if (lastCurrentReading < 0) {
						lastCurrentReading = 0;
					}
				}

				// Subtract this current from the 'other' currents (except for the charger, this is already subtracted).
				if (energySource.currentSensorId !== ProcessingHelper.CHARGER_SENSOR_ID) {
					otherCurrent -= currentReading;
					lastReadingOtherCurrent -= lastCurrentReading;
				}

				// Set the sensor data.
				sensorData.now.energySourceCurrents[energySource.id] = currentReading;
				sensorData.lastReading.energySourceCurrents[energySource.id] = lastCurrentReading;
			}
		});

		// Fill in the 'other' source.
		if (otherSourceId) {
			if (otherCurrent < 0) {
				otherCurrent = 0;
			}
			sensorData.now.energySourceCurrents[otherSourceId] = otherCurrent;
			if (lastReadingOtherCurrent < 0) {
				lastReadingOtherCurrent = 0;
			}
			sensorData.lastReading.energySourceCurrents[otherSourceId] = lastReadingOtherCurrent;
		}

		// Check we have all the required readings for additional sensors.
		if (!haveAllReadings) {
			reject('A energy source current is missing.');
			return;
		}

		// Check we have all required 'now' readings for calculations. Building power is not required.
		if (sensorData.now.batteryVoltage === undefined || sensorData.now.batteryCurrent === undefined || sensorData.now.loadCurrent === undefined) {
			reject('Essential value is undefined.');
			return;
		}

		resolve(sensorData);
	});
};

/*
Processes a single reading.
	building: The building this reading belongs to.
	reading: The reading to process.
	lastReading: The reading immediately before this one. Undefined if this is the first reading.
	currentProcessResult: The current process result. This is an object with the same return type as this function.
	Returns: A promise. On resolve, returns an object like:
		{
			state: the new state,
			futureStates: an array of future states to save. This is only present if generated.
		}
*/
ReadingProcessing.processReading = function(building, reading, lastReading, currentProcessResult) {
	var State = app.models.State;
	var currentState = currentProcessResult.state;
	return new Promise(function(resolve, reject) {
		// Apply the 'onlyProcessAfter' and 'onlyProcessUntil' logic on incoming live data.
		if (building.onlyProcessAfter && reading.timestamp < building.onlyProcessAfter) {
			reject('Reading happened before the onlyProcessAfter time.');
			return;
		}
		if (building.onlyProcessUntil && reading.timestamp >= building.onlyProcessUntil) {
			reject('Reading happened after or at the onlyProcessUntil time.');
			return;
		}

		var secondsSinceLastReading = 0;
		if (lastReading) {
			secondsSinceLastReading = reading.timestamp - lastReading.timestamp;
		}
		if (secondsSinceLastReading < 0) {
			reject('Less than zero seconds between this reading and the last reading.');
			return;
		}

		if (!ReadingProcessing.buildingHasProcessingParams(building)) {
			reject('Processing parameters for the building are missing.');
			return;
		}

		// Get the sensor data which collects the important data from reading and lastReading plus checks for errors.
		ReadingProcessing.getSensorData(reading, lastReading, building).then(function(sensorData) {
			var powerChangeSinceLastReading;
			if (ProcessingHelper.canExtrapolateFromLastReading(building, secondsSinceLastReading)) {
				/*
					The power change is expressed in Watt Hours.
						A Watt Hour is 3600J.
						The power (in Watts, P=IV) multiplied by the time in seconds gets the amount of change in Joules over the time gap.
						Divide the number of Joules by 3600 to get the amount of change in Watt Hours.
				*/
				powerChangeSinceLastReading = (sensorData.lastReading.batteryVoltage * sensorData.lastReading.batteryCurrent * secondsSinceLastReading) / 3600;
			} else {
				powerChangeSinceLastReading = 0;
			}

			// Get information about the battery state.
			var batteryState = ReadingProcessing.analyseVoltage(building, currentState, reading.timestamp, sensorData);

			// Update the state of charge.
			StateOfCharge.updateStateOfCharge(powerChangeSinceLastReading, currentState, batteryState, building, reading.timestamp, secondsSinceLastReading);

			EnergyFlow.updateEnergyFlowStates(currentState, building, sensorData, reading.timestamp, secondsSinceLastReading);

			// Fill in future state predictions every half an hour.
			if (ProcessingHelper.shouldRunEndOfHalfHourJobs(secondsSinceLastReading, reading.timestamp, true)) {
				var futureStates = StatePredictions.predictFutureStates(building, currentState, reading.timestamp);
				if (futureStates && futureStates.length > 0) {
					currentProcessResult.futureStates = futureStates;
				}
			}

			// Update the state timestamp to be up to date with the reading's timestamp.
			currentState.timestamp = reading.timestamp;
			currentState.readingId = reading.id;

			// If the state needs to be recorded, then record it.
			if (ReadingProcessing.shouldRecordState(secondsSinceLastReading, reading.timestamp)) {
				var currentStateToSave;
				if (currentState.id) {
					currentStateToSave = currentState.toJSON();
					delete currentStateToSave.id;
				} else {
					currentStateToSave = currentState;
				}

				// Record the State.
				State.create(currentStateToSave, function(error) {
					if (error) {
						reject(error);
					} else {
						resolve(currentProcessResult);
					}
				});
			} else {
				// Resolve the state immediately if it doesn't need to be saved.
				resolve(currentProcessResult);
			}
		}, reject);
	});
};
