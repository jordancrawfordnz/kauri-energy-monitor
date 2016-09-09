var Promise = require('promise');
var app = require('../server/server');
var moment = require('moment');
var ProcessingHelper = require('./processinghelper.js');
var EnergyFlow = require('./energyflow.js');

var StatePredictions = {};
module.exports = StatePredictions;

StatePredictions.HOURS_TO_PREDICT = 24;
StatePredictions.HOUR_MULTIPULE = 0.5;
StatePredictions.FULL_BATTERY_THRESHOLD = 0.9;
StatePredictions.EMPTY_BATTERY_THRESHOLD = 0.1;

StatePredictions.FULLY_CHARGED_EVENT = 'fullyCharged';
StatePredictions.EMPTY_EVENT = 'empty';

// Returns boolean. True if the battery is empty in the future state provided.
StatePredictions.isBatteryEmptyInFutureState = function(futureState) {
	return (futureState.currentChargeLevel / futureState.batteryCapacity) <= StatePredictions.EMPTY_BATTERY_THRESHOLD;
};

// Returns boolean. True if the battery is full in the future state provided.
StatePredictions.isBatteryFullInFutureState = function(futureState) {
	return (futureState.currentChargeLevel / futureState.batteryCapacity) >= StatePredictions.FULL_BATTERY_THRESHOLD;
};

/*
	Predicts the future state for the next HOURS_TO_PREDICT hours.
	This makes use of the Energy Flow service to predict the future based on the past.

	This takes the follow parameters:
		- building (including energy sources). The building to use energy sources and consumption from.
		- currentState. The current state to store event predictions and to use as a starting point.
		- timestamp. The timestamp to start predicting from.

*/
StatePredictions.predictFutureStates = function(building, currentState, timestamp) {
		// TODO: Don't forget about when the battery is ALREADY charged, don't consider it almost charged! It has to go from not charged to being charged!
			// Same with empty. The state actually has to change!

	// Don't make any predictions in the prelim phase.
	if (!currentState.emptyLevelEstablished) {
		return;
	}
	// Round the timestamp to the start of the half hour period.
	timestamp = ProcessingHelper.getTimestampToNearestHalfHour(timestamp);
	
	// Setup the initial future state based off the current state.
	var currentFutureState = {};
	currentFutureState.buildingId = building.id;
	currentFutureState.batteryCapacity = currentState.batteryCapacity; // keep the battery capacity the same throughout the prediction.
	currentFutureState.currentChargeLevel = currentState.currentChargeLevel; // start with the current charge level.
	
	// Start with the same daily totals. Continue the hourly totals (these will reset if needed).
	currentFutureState.consumption = {
		dailyTotal : currentState.consumption.dailyTotal,
		hourlyTotal : currentState.consumption.hourlyTotal
	};
	currentFutureState.sources = {};

	var timeToItterate = ProcessingHelper.SECONDS_IN_HOUR * StatePredictions.HOUR_MULTIPULE;

	building.energySources.forEach(function(energySource) {
		var sourceCurrentState = currentState.sources[energySource.id];
		if (!sourceCurrentState) {
			return;
		}
		var sourceFutureState = {};
		sourceFutureState.dailyCharge = sourceCurrentState.dailyCharge;
		sourceFutureState.hourlyCharge = sourceCurrentState.hourlyCharge;
		
		currentFutureState.sources[energySource.id] = sourceFutureState;
	});

	var futureStates = [];

	var nextEvent = null;
	
	// These represent the current state of the system.
	var isFullyCharged = StatePredictions.isBatteryFullInFutureState(currentFutureState);
	var isEmpty = StatePredictions.isBatteryEmptyInFutureState(currentFutureState);

	// Itterate through each HOURS_TO_PREDICT in half an hour blocks.
	for (var currentHour = 0; currentHour < StatePredictions.HOURS_TO_PREDICT * (1/StatePredictions.HOUR_MULTIPULE); currentHour++) {		
		// Move forward by half an hour.
		timestamp += timeToItterate;		

		currentFutureState.timestamp = timestamp;

		// Get the day and hour index.
		var dayIndex = EnergyFlow.getPredictionDayIndexFromEndOfLastHour(timestamp);
		var hourIndex = EnergyFlow.getPredictionHourIndexFromEndOfLastHalfHour(timestamp);
		
		// These resets should happen at the 30 minute points.
		var doEndOfHourResets = ProcessingHelper.shouldRunEndOfHourJobs(timeToItterate, timestamp, true);
		var doEndOfDayResets = ProcessingHelper.shouldRunEndOfDayJobs(timeToItterate, timestamp, true);
		if (doEndOfHourResets) {
			currentFutureState.consumption.hourlyTotal = 0;
		}
		if (doEndOfDayResets) {
			currentFutureState.consumption.dailyTotal = 0;
		}
		
		// Get the total consumption over the period and add to the hourly and daily consumption.
		var totalPeriodConsumption = EnergyFlow.getPredictedEnergy(building.predictionPattern, dayIndex, hourIndex) * StatePredictions.HOUR_MULTIPULE;
		currentFutureState.consumption.dailyTotal += totalPeriodConsumption;
		currentFutureState.consumption.hourlyTotal += totalPeriodConsumption;

		// Fill in generation details over the period and get the total generation.
		var totalPeriodGeneration = 0;
		building.energySources.forEach(function(energySource) {
			var source = currentFutureState.sources[energySource.id];
			
			// Do resets where needed.
			if (doEndOfHourResets) source.hourlyCharge = 0;
			if (doEndOfDayResets) source.dailyCharge = 0;
			
			// Update the generation totals.
			var generationContribution = EnergyFlow.getPredictedEnergy(energySource.predictionPattern, dayIndex, hourIndex) * StatePredictions.HOUR_MULTIPULE;
			source.dailyCharge += generationContribution;
			source.hourlyCharge += generationContribution;
			totalPeriodGeneration += generationContribution;
		});

		// Determine amount going into or out of battery in the hour. (positive is charge, negative is discharge)
		var netBatteryChange = totalPeriodGeneration - totalPeriodConsumption;
		
		// If energy going into the battery, apply charge efficiency.
		if (netBatteryChange > 0) {
			netBatteryChange *= currentState.chargeEfficiency;
		}

		// Update the future state.
		currentFutureState.currentChargeLevel += netBatteryChange;

		// Check for any critical events if one hasn't already been found.
		var predictionFullyCharged = StatePredictions.isBatteryFullInFutureState(currentFutureState);
		var predictionIsEmpty = StatePredictions.isBatteryEmptyInFutureState(currentFutureState);

		// If going fully charged in this state.
		if (!nextEvent) {
			if (!isFullyCharged && predictionFullyCharged) {
				nextEvent = {
					type : StatePredictions.FULLY_CHARGED_EVENT,
					timestamp : timestamp
				};
			} else if (!isEmpty && predictionIsEmpty) { // If going empty in this state.
				nextEvent = {
					type : StatePredictions.EMPTY_EVENT,
					timestamp : timestamp
				};
			}
		}

		// Copy and store the future state.
		futureStates.push(JSON.parse(JSON.stringify(currentFutureState)));
	}

	currentState.nextEvent = nextEvent;

	return futureStates;
};