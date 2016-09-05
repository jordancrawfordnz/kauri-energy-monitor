var Promise = require('promise');
var app = require('../server/server');
var moment = require('moment');
var ProcessingHelper = require('./processinghelper.js');

var StateOfCharge = {};
module.exports = StateOfCharge;

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

// Returns a boolean. True if the energyInSinceLastC0 and energyOutSinceLastC0 are sufficiently large enough to be used.
StateOfCharge.enoughDataToRecalculateChargeEfficiency = function(building, currentState, energyInSinceLastC0, energyOutSinceLastC0) {
	return energyInSinceLastC0 >= building.recalculateChargeEfficiencyCapacityMultiplier*currentState.batteryCapacity && energyOutSinceLastC0 >= building.recalculateChargeEfficiencyCapacityMultiplier*currentState.batteryCapacity;	
};

// Process a reading to update the state of charge.
StateOfCharge.updateStateOfCharge = function(powerChangeSinceLastReading, currentState, batteryState, building, timestamp, secondsSinceLastReading) {
	if (!currentState.emptyLevelEstablished) { // Empty level not established, in preliminary phase.
		StateOfCharge.processPreliminaryPhase(powerChangeSinceLastReading, currentState, batteryState, building, timestamp);
	} else { // Empty level has been established, in operational phase.
		StateOfCharge.processOperationalPhase(powerChangeSinceLastReading, currentState, batteryState, building, timestamp, secondsSinceLastReading);
	}
};

// Processes a reading using the rules for the preliminary phase.
StateOfCharge.processPreliminaryPhase = function(powerChangeSinceLastReading, currentState, batteryState, building, timestamp) {
	// If power has entered the battery, the charge efficiency is taken into account.
	if (powerChangeSinceLastReading > 0) {
		powerChangeSinceLastReading *= currentState.chargeEfficiency;
	}

	// If the charge level won't go below 0.
	if ((currentState.currentChargeLevel + powerChangeSinceLastReading) >= 0) {
		// Update the current charge.
		currentState.currentChargeLevel += powerChangeSinceLastReading;
	} else {
		// Don't update the charge level, update the current capacity instead.
		currentState.batteryCapacity += Math.abs(powerChangeSinceLastReading);
	}
	
	// If the current charge level is over the battery capacity, increase the battery capacity.
	if (currentState.currentChargeLevel > currentState.batteryCapacity) {
		currentState.batteryCapacity = currentState.currentChargeLevel;
	}

	// Update the maximum prelim charge level.
	if (currentState.maximumPrelimPhaseChargeLevel < currentState.currentChargeLevel) {
		currentState.maximumPrelimPhaseChargeLevel = currentState.currentChargeLevel;
	}

	if (batteryState.lowBatteryLevelTrigger) {
		currentState.emptyLevelEstablished = true; // The level has been established so can go to the operational phase.
		currentState.batteryCapacity = currentState.maximumPrelimPhaseChargeLevel; // Adjust the battery capacity to be the maximum value of the charge level.
		currentState.currentChargeLevel = 0; // Make the charge level zero as we know the battery is empty.
		StateOfCharge.recordRecalibration(building, timestamp, 'PreliminaryPhaseB0Hit');
	}
};

// Processes a reading using the rules for the operational phase.
StateOfCharge.processOperationalPhase = function(powerChangeSinceLastReading, currentState, batteryState, building, timestamp, secondsSinceLastReading) {
	if (powerChangeSinceLastReading > 0) { // If power has entered the battery since the last reading.
		// Increment the energy in with the raw power change, don't want charge efficiency having an effect.
		currentState.currentEnergyInSinceLastC0 += powerChangeSinceLastReading;

		// Take the current charge efficiency into account.
		powerChangeSinceLastReading *= currentState.chargeEfficiency;
	} else {
		// Increment the energy out with the raw power change.
		currentState.currentEnergyOutSinceLastC0 += Math.abs(powerChangeSinceLastReading);
	}

	// If the time is correct, reduce the battery capacity by the daily aging percentage.
	if (ProcessingHelper.shouldRunEndOfDayJobs(secondsSinceLastReading, timestamp)) {
		currentState.batteryCapacity *= 1 - building.dailyAgingPercentage / 100;
		StateOfCharge.recordRecalibration(building, timestamp, 'OperationalDailyAging');
	}

	// Update the current charge state.
	currentState.currentChargeLevel += powerChangeSinceLastReading;

	var currentStateOfCharge = currentState.currentChargeLevel / currentState.batteryCapacity;
	var positiveThreshold = 1 + building.tolerancePercentage / 100;
	var negativeThreshold = -building.tolerancePercentage / 100;
	var emptyBottomThreshold = building.tolerancePercentage / 100;

	/* Check for charge level of 0%.
		Caused by:
		- Battery level being empty
		- Hitting a threshold of negative battery state of charge.

		These situations re-calculate the state of charge.
	*/
	
	// If the voltage represents low battery and above the threshold (e.g.: above or equal to 5% SoC but see battery empty).
	var unexpectedBatteryEmpty = batteryState.lowBatteryLevelTrigger && currentStateOfCharge >= emptyBottomThreshold;

	// Less than negative threshold (e.g.: less than or equal to -5%)
	var expectedBatteryEmpty = !batteryState.lowBatteryLevelTrigger && currentStateOfCharge <= negativeThreshold;
	
	if (unexpectedBatteryEmpty || expectedBatteryEmpty) {
		// Check if there is enough information to re-calculate the charge efficiency.
		var energyInSinceLastC0 = currentState.currentEnergyInSinceLastC0;
		var energyOutSinceLastC0 = currentState.currentEnergyOutSinceLastC0;

		var currentValuesAreSufficient = StateOfCharge.enoughDataToRecalculateChargeEfficiency(building, currentState, energyInSinceLastC0, energyOutSinceLastC0);
		var withPreviousValuesAreSufficient = false;
		if (!currentValuesAreSufficient) {
			energyInSinceLastC0 += currentState.previousEnergyInSinceLastC0;
			energyOutSinceLastC0 += currentState.previousEnergyOutSinceLastC0;
			withPreviousValuesAreSufficient = StateOfCharge.enoughDataToRecalculateChargeEfficiency(building, currentState, energyInSinceLastC0, energyOutSinceLastC0);
		}

		if (currentValuesAreSufficient || withPreviousValuesAreSufficient) {
			currentState.currentChargeLevel = 0;
			var potentialChargeEfficiency = energyOutSinceLastC0 / energyInSinceLastC0;
			if (potentialChargeEfficiency <= 1) {
				currentState.chargeEfficiency = potentialChargeEfficiency;

				StateOfCharge.recordRecalibration(building, timestamp, 'OperationalRecalculatedChargeEfficiency');

				if (currentValuesAreSufficient) {
					// Make these the previous values.
					currentState.previousEnergyInSinceLastC0 = currentState.currentEnergyInSinceLastC0;
					currentState.previousEnergyOutSinceLastC0 = currentState.currentEnergyOutSinceLastC0;
					StateOfCharge.recordRecalibration(building, timestamp, 'OperationalMovingEinEoutSinceLastC0ToPrevious');

					// Reset the current values.
					currentState.currentEnergyInSinceLastC0 = 0;
					currentState.currentEnergyOutSinceLastC0 = 0;
				}
			}
		}
	}

	/* 
		Check for the current charge level rising above the tolerence level. 
		These situations increase the battery capacity, resulting in 100% SoC.
	*/
	var chargeCapacityTooLow = false;
	if (currentStateOfCharge >= positiveThreshold) {
		currentState.batteryCapacity = currentState.currentChargeLevel; // set the capacity to the current charge level.
		StateOfCharge.recordRecalibration(building, timestamp, 'OperationalC100AdjustUp');
	}
};