var Promise = require('promise');
var app = require('../server/server');
var moment = require('moment');
var ProcessingHelper = require('./processinghelper.js');

var EnergyFlow = {};
module.exports = EnergyFlow;

// Adjusts the current average with an exponential average.
	// TODO: Support rolling averages too.
EnergyFlow.calculateNewAverage = function(currentAverage, newValue) {
	if (currentAverage === undefined) {
		return newValue;
	} else {
		return (currentAverage / 2 + newValue)/ 1.5;
	}
};

// Sets up a source state template if it doesn't exist for the state.
EnergyFlow.setupSourceStateTemplate = function(state, sourceName) {
	if (!state.sources[sourceName]) {
		state.sources[sourceName] = {
			dailyCharge : 0,
			hourlyCharge : 0
		};
	}
};

// Updates the details about the house consumption.
EnergyFlow.processConsumption = function(building, currentState, consumptionNow, secondsSinceLastReading, timestamp) {
	var consumption = currentState.consumption;

	// Reset the daily and hourly consumption if needed.
	if (ProcessingHelper.shouldRunEndOfHourJobs(secondsSinceLastReading, timestamp, true)) {
		consumption.hourlyTotal = 0;
	}
	if (ProcessingHelper.shouldRunEndOfDayJobs(secondsSinceLastReading, timestamp, true)) {
		consumption.dailyTotal = 0;
	}

	// Get the consumption since the last reading.
	var consumptionContribution;
	if (ProcessingHelper.canExtrapolateFromLastReading(building, secondsSinceLastReading)) {
		consumptionContribution = (consumptionNow * secondsSinceLastReading) / 3600;
		consumption.averagePower = EnergyFlow.calculateNewAverage(consumption.averagePower, consumptionNow);
	} else {
		consumptionContribution = 0;
	}

	consumption.hourlyTotal += consumptionContribution;
	consumption.dailyTotal += consumptionContribution;
};

// Updates the details about a charging source.
EnergyFlow.processSource = function(building, currentState, sourceId, powerNow, powerLastReading, secondsSinceLastReading, timestamp) {
	EnergyFlow.setupSourceStateTemplate(currentState, sourceId);
	var source = currentState.sources[sourceId];
	if (powerNow > 0) {
		// If the sensor value is positive, the source is charging.
		source.power = powerNow;
	} else {
		source.power = 0;
	}
	// Reset the daily and hourly charge if needed.
	if (ProcessingHelper.shouldRunEndOfHourJobs(secondsSinceLastReading, timestamp, true)) {
		source.hourlyCharge = 0;
	}
	if (ProcessingHelper.shouldRunEndOfDayJobs(secondsSinceLastReading, timestamp, true)) {
		source.dailyCharge = 0;
	}

	// Get the energy contribution of this source.
	var chargeContribution;
	var canExtrapolate = ProcessingHelper.canExtrapolateFromLastReading(building, secondsSinceLastReading);
	if (canExtrapolate && powerLastReading > 0) {
		chargeContribution = (powerLastReading * secondsSinceLastReading) / 3600;
	} else {
		chargeContribution = 0;
	}

	if (canExtrapolate) {
		// Re-calculate the average power of the source.
		source.averagePower = EnergyFlow.calculateNewAverage(source.averagePower, source.power);
	}
	
	source.dailyCharge += chargeContribution; // record the total energy from this source for today in Wh.
	source.hourlyCharge += chargeContribution; // record the total energy from this source for this hour in Wh.
};

// Updates the states of the energy flow.
EnergyFlow.updateEnergyFlowStates = function(currentState, building, sensorData, timestamp, secondsSinceLastReading)
{
	// Update 'isBatteryCharging' to be true if the battery current is positive.
	currentState.isBatteryCharging = sensorData.now.batteryCurrent > 0;

	// Fill in charging information about energy sources.
	building.energySources.forEach(function(energySource) {
		var energySourceCurrent = sensorData.now.energySourceCurrents[energySource.id];
		var lastReadingEnergySourceCurrent = sensorData.lastReading.energySourceCurrents[energySource.id];

		var sourcePower = energySourceCurrent * sensorData.now.batteryVoltage;
		var lastReadingSourcePower = lastReadingEnergySourceCurrent * sensorData.lastReading.batteryVoltage;

		if (energySource.currentSensorId === ProcessingHelper.CHARGER_SENSOR_ID) {
			// If charging via the charger and have building power, add the two together to see the real amount of energy provided by the generator.
			if (sourcePower > 0 && sensorData.now.buildingPower) {
				sourcePower += sensorData.now.buildingPower;
			}
			if (lastReadingSourcePower > 0 && sensorData.lastReading.buildingPower) {
				lastReadingSourcePower += sensorData.lastReading.buildingPower;
			}
		}

		EnergyFlow.processSource(building, currentState, energySource.id, sourcePower, lastReadingSourcePower, secondsSinceLastReading, timestamp);
	});

	// Fill in details about house energy consumption.
	if (sensorData.now.buildingPower) {
		EnergyFlow.processConsumption(building, currentState, sensorData.now.buildingPower, secondsSinceLastReading, timestamp);	
	}
};