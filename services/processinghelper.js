var moment = require('moment');

var ProcessingHelper = {};
module.exports = ProcessingHelper;

ProcessingHelper.CHARGER_SENSOR_ID = 'charger';
ProcessingHelper.OTHER_SENSOR_ID = 'other';
ProcessingHelper.SECONDS_IN_HOUR = 3600;

// Returns a boolean. True if end of hour jobs should run.
	// timeSinceLastReading: The number of seconds since the last reading.
	// timestamp: The timestamp of the reading being processed.
	// oneReadingAfter: Whether to count end of hour jobs as happening the reading after the hour switches.
ProcessingHelper.shouldRunEndOfHourJobs = function(timeSinceLastReading, timestamp, oneReadingAfter) {
	if (oneReadingAfter) {
		timestamp--;
	}
	var outBy = timestamp % (60*60);

	// Either the timestamp is perfectly on the hour or the hour change was missed.
	return outBy === 0 || outBy < timeSinceLastReading;
};

// Returns a boolean. True if end of half hour jobs should be run.
	// timeSinceLastReading: The number of seconds since the last reading.
	// timestamp: The timestamp of the reading being processed.
	// oneReadingAfter: Whether to count end of hour jobs as happening the reading after the hour switches.
ProcessingHelper.shouldRunEndOfHalfHourJobs = function(timeSinceLastReading, timestamp, oneReadingAfter) {
	if (oneReadingAfter) {
		timestamp--;
	}
	var outBy = timestamp % (30*60);

	// Either the timestamp is perfectly on the hour or the hour change was missed.
	return outBy === 0 || outBy < timeSinceLastReading;
};

// Returns a boolean. True if end of day jobs should be performed.
	// timeSinceLastReading: The number of seconds since the last reading.
	// timestamp: The timestamp of the reading being processed.
	// oneReadingAfter: Whether to count end of day jobs as happening the reading after the day switches.
ProcessingHelper.shouldRunEndOfDayJobs = function(timeSinceLastReading, timestamp, oneReadingAfter) {
	if (oneReadingAfter) {
		timestamp--;
	}

	var outBy = timestamp - moment.unix(timestamp).startOf('day').unix();

	// Either the timestamp is perfectly on midnight or midnight was missed.
	return outBy === 0 || outBy < timeSinceLastReading;
};

// Returns a boolean as to whether the reading can be extrapolated from.
ProcessingHelper.canExtrapolateFromLastReading = function(building, secondsSinceLastReading) {
	if (building.minutesBetweenReadingsToIgnore === undefined || building.minutesBetweenReadingsToIgnore === null) {
		return true;
	} else {
		return secondsSinceLastReading < building.minutesBetweenReadingsToIgnore*60; // extrapolate only if less than the amount of minutes between readings to ignore.
	}
};

// Returns the Unix timestamp to the nearest hour.
ProcessingHelper.getTimestampToNearestHour = function(timestamp) {
	return timestamp - (timestamp % ProcessingHelper.SECONDS_IN_HOUR);
};

// Returns the Unix timestamp to the nearest half hour.
ProcessingHelper.getTimestampToNearestHalfHour = function(timestamp) {
	return timestamp - (timestamp % (ProcessingHelper.SECONDS_IN_HOUR / 2));
};

// Takes a timestamp representing a time like 2:00:10pm, scales it back to 2:00:00pm, then subtracts 1 to get 1:59:59pm.
ProcessingHelper.getTimestampAtEndOfLastHour = function(timestamp) {
	return ProcessingHelper.getTimestampToNearestHour(timestamp) - 1;
};

// Takes a timestamp representing a time like 2:00:10pm, scales it back to 2:00:00pm, then subtracts 1 to get 1:59:59pm.
	// Or, takes 2:30:10pm, scales it back to 2:30:00pm, then subtracts 1 to get 2:29:59pm.
ProcessingHelper.getTimestampAtEndOfLastHalfHour = function(timestamp) {
	return ProcessingHelper.getTimestampToNearestHalfHour(timestamp) - 1;
};