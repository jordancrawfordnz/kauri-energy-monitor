var ProcessingHelper = {};
module.exports = ProcessingHelper;

// Returns a boolean. True if daily aging should be performed.
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

// Returns a boolean. True if end of day jobs should be performed.
	// timeSinceLastReading: The number of seconds since the last reading.
	// timestamp: The timestamp of the reading being processed.
	// oneReadingAfter: Whether to count end of day jobs as happening the reading after the day switches.
ProcessingHelper.shouldRunEndOfDayJobs = function(timeSinceLastReading, timestamp, oneReadingAfter) {
	// TODO: Timezone support?
	if (oneReadingAfter) {
		timestamp--;
	}
	var outBy = (timestamp - 60*60*12) % (60*60*24); // match on midday GMT which is midnight in +12 NZ.
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