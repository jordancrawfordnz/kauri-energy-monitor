'use strict';

var app = angular.module('offgridmonitoringApp');
    
// Provides helpers to work with timestamps.
app.factory('Timestamp', function($rootScope) {
   	var Timestamp = {};
    
   	// Gets the where filter that limits the time period.
    Timestamp.getRangeWhereFilter = function(from, until, displayEvery) {
      if (from && from.length > 0) {
        var fromTimestamp = moment(from, $rootScope.dateTimeFormat).unix();
      }
      if (until && until.length > 0) {
        var untilTimestamp = moment(until, $rootScope.dateTimeFormat).unix();
      }

      var whereFilter = {};

      if (untilTimestamp || fromTimestamp || displayEvery) {
      	whereFilter.timestamp = {};

        // If until and from defined, use a between filter.
        if (untilTimestamp && fromTimestamp) {
          whereFilter.timestamp.between = [fromTimestamp, untilTimestamp];
        } else { // Otherwise use either less than or greater than filters.
          if (untilTimestamp) {
            whereFilter.timestamp.lt = untilTimestamp;
          }
          if (fromTimestamp) {
            whereFilter.timestamp.gt = fromTimestamp;
          }
        }

        // If displayEvery is defined, require the timestamp be divisible by some amount.
          // e.g.: displayEvery of 60 will match data every minute.
        if (displayEvery) {
        	whereFilter.timestamp.mod = [displayEvery, 0];
        }
      }

      return whereFilter;
    };

    return Timestamp;
});
