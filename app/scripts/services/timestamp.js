'use strict';

var app = angular.module('offgridmonitoringApp');
    
// Provides helpers to work with timestamps.
app.factory('Timestamp', function($rootScope) {
   	var Timestamp = {};
    
   	// Gets the where filter that limits the time period.
    Timestamp.getRangeWhereFilter = function(from, until) {
      if (from && from.length > 0) {
        var fromTimestamp = moment(from, $rootScope.dateTimeFormat).unix();
      }
      if (until && until.length > 0) {
        var untilTimestamp = moment(until, $rootScope.dateTimeFormat).unix();
      }

      var whereFilter = {};
      if (untilTimestamp || fromTimestamp) {
        whereFilter.timestamp = {};
        if (untilTimestamp && fromTimestamp) {
          whereFilter.timestamp.between = [fromTimestamp, untilTimestamp];
        } else {
          if (untilTimestamp) {
            whereFilter.timestamp.lt = untilTimestamp;
          }
          if (fromTimestamp) {
            whereFilter.timestamp.gt = fromTimestamp;
          }
        }
      }
      
      return whereFilter;
    };

    return Timestamp;
});
