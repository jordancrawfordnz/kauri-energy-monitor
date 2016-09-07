var Promise = require('promise');
var app = require('../server/server');
var moment = require('moment');
var ProcessingHelper = require('./processinghelper.js');

var EnergyFlow = {};
module.exports = EnergyFlow;

EnergyFlow.CONSUMPTION_POWER_WEEKLY_ROLLING_AVERAGE_PERIOD = 3; // Consumption patterns averaged over three weeks.
EnergyFlow.CONSUMPTION_PREDICTION_TYPE = 'weekly';

EnergyFlow.ENERGY_SOURCE_POWER_DAILY_ROLLING_AVERAGE_PERIOD = 14; // Generation patterns averaged over two weeks.

// Adjusts the current average with an exponential average.
EnergyFlow.calculateNewExponentialAverage = function(currentAverage, newValue) {
	if (currentAverage === undefined) {
		return newValue;
	} else {
		return (currentAverage / 2 + newValue)/ 1.5;
	}
};

// Computes an estimated rolling average that prevents looking back to previous data.
	// The rolling period is the number of values that should be included in the rolling average.
EnergyFlow.calculateNewRollingAverage = function(currentAverage, newValue, rollingPeriod) {
	if (currentAverage === undefined) {
		return newValue;
	} else {
		return ((rollingPeriod - 1) * currentAverage + newValue) / rollingPeriod;
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

// Updates the details about a charging source.
EnergyFlow.processSource = function(building, currentState, energySource, powerNow, powerLastReading, secondsSinceLastReading, timestamp) {
	
	EnergyFlow.setupSourceStateTemplate(currentState, energySource.id);
	var source = currentState.sources[energySource.id];
	if (powerNow > 0) {
		// If the sensor value is positive, the source is charging.
		source.power = powerNow;
	} else {
		source.power = 0;
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
		source.averagePower = EnergyFlow.calculateNewExponentialAverage(source.averagePower, source.power);
	}

	// Reset the daily and hourly charge if needed.
	if (ProcessingHelper.shouldRunEndOfHourJobs(secondsSinceLastReading, timestamp, true)) {
		source.hourlyCharge = 0;
		// TODO: Update the prediction pattern.
	}
	if (ProcessingHelper.shouldRunEndOfDayJobs(secondsSinceLastReading, timestamp, true)) {
		source.dailyCharge = 0;
	}
	
	source.dailyCharge += chargeContribution; // record the total energy from this source for today in Wh.
	source.hourlyCharge += chargeContribution; // record the total energy from this source for this hour in Wh.
};

// Gets the hour of the day from 0 to 23, 0 represents 0000 to 0100, 23 represents 2300 to 0000
EnergyFlow.getPredictionHourIndex = function(timestamp) {
	// TODO: Support timezones and DST.
	return moment.unix(timestamp).hour();
};

// Gets the day of the week, 0 represents Sunday, 6 represents Saturday.
EnergyFlow.getPredictionDayIndex = function(timestamp) {
	// TODO: Support timezones and DST.
	return moment.unix(timestamp).day();
};

/*
	Updates the prediction pattern object for an energy source or building.
	- predictionPattern: Object. The current pattern. This should not be null or undefined.
	- newValue: Number. The new hourly consumption figure to include in the pattern.
	- predictionType: String. The prediction type defined by the user. If the pattern does not fit this type, it will be restarted.
	- rollingAveragePeriod: Number. This is the period length if a rolling average needs to be used. There is no gaurentee a rolling average will be used.
	- timestamp: Number. This is the Unix timestamp for this reading (used to determine position in the pattern)
*/
EnergyFlow.updatePredictionPattern = function(predictionPattern, newValue, predictionType, rollingAveragePeriod, timestamp) {
	// If the prediction type is wrong, reset the prediction.
	if (predictionPattern.type !== predictionType) {
		predictionPattern.type = predictionType;
		predictionPattern.data = {};
	}
	if (!predictionPattern.data) {
		predictionPattern.data = {};
	}

	switch (predictionType) {
		case 'weekly': { // weekly cycles keep track of the average power over each hour of the week.
			var data = predictionPattern.data;
			var hourIndex = EnergyFlow.getPredictionHourIndex(timestamp);
			var dayIndex = EnergyFlow.getPredictionDayIndex(timestamp);
			if (!data.days) {
				data.days = {};
			}
			var today = data.days[dayIndex];
			if (!today) {
				today = {};
				data.days[dayIndex] = today;
			}
			today[hourIndex] = EnergyFlow.calculateNewRollingAverage(today[dayIndex], newValue, rollingAveragePeriod);
		}
	}
};


// Updates the details about the house consumption.
EnergyFlow.processConsumption = function(building, currentState, consumptionNow, secondsSinceLastReading, timestamp) {
	var consumption = currentState.consumption;

	// Get the consumption since the last reading.
	var consumptionContribution;
	if (ProcessingHelper.canExtrapolateFromLastReading(building, secondsSinceLastReading)) {
		consumptionContribution = (consumptionNow * secondsSinceLastReading) / 3600;
		consumption.averagePower = EnergyFlow.calculateNewExponentialAverage(consumption.averagePower, consumptionNow);
	} else {
		consumptionContribution = 0;
	}

	// Reset the daily and hourly consumption if needed.
	if (ProcessingHelper.shouldRunEndOfHourJobs(secondsSinceLastReading, timestamp, true)) {
		// Update the building's prediction pattern.
		var predictionPattern = building.predictionPattern;
		if (!predictionPattern) {
			predictionPattern = {};
			building.predictionPattern = predictionPattern;
		}
		EnergyFlow.updatePredictionPattern(predictionPattern, consumption.hourlyTotal, EnergyFlow.CONSUMPTION_PREDICTION_TYPE, EnergyFlow.CONSUMPTION_POWER_WEEKLY_ROLLING_AVERAGE_PERIOD, timestamp);
		building.needsSave = true; // signal that the building should be saved.

		consumption.hourlyTotal = 0;
	}
	if (ProcessingHelper.shouldRunEndOfDayJobs(secondsSinceLastReading, timestamp, true)) {
		consumption.dailyTotal = 0;
	}

	consumption.hourlyTotal += consumptionContribution;
	consumption.dailyTotal += consumptionContribution;
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

		EnergyFlow.processSource(building, currentState, energySource, sourcePower, lastReadingSourcePower, secondsSinceLastReading, timestamp);
	});

	// Fill in details about house energy consumption.
	if (sensorData.now.buildingPower) {
		EnergyFlow.processConsumption(building, currentState, sensorData.now.buildingPower, secondsSinceLastReading, timestamp);	
	}
};