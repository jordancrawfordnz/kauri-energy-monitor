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
        whereFilter.and = [];
        
        // If displayEvery is defined, require the timestamp be divisible by some amount.
          // e.g.: displayEvery of 60 will match data every minute.
        if (displayEvery) {
          whereFilter.and.push({timestamp : {mod : [displayEvery, 0]}});
        }

        if (fromTimestamp) {
          whereFilter.and.push({timestamp : {gt : fromTimestamp}});
        }

        if (untilTimestamp) {
          whereFilter.and.push({timestamp : {lt : untilTimestamp}});
        }
      }

      return whereFilter;
    };

    return Timestamp;
});
