'use strict';

var app = angular.module('offgridmonitoringApp');
    
// Provides functions that helps with the future state estimations.
app.factory('FutureStateHelper', function(ChartColours, $rootScope) {
  var FutureStateHelper = {};

  FutureStateHelper.hourIndexes = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23];
  FutureStateHelper.daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  FutureStateHelper.getHourText = function(hourIndex) {
    var number;
    if (hourIndex < 12) {
      number = hourIndex + 1;
    } else {
      number = hourIndex + 1 - 12;
    }
    if (hourIndex < 11 || hourIndex === 23) {
      return number + ' am';
    } else {
      return number + ' pm';
    }
  };

  FutureStateHelper.getDayText = function(dayIndex) {
    return FutureStateHelper.daysOfWeek[dayIndex];
  };

  FutureStateHelper.getWeeklyPredictionPatternText = function(dayIndex, hourIndex) {
    return FutureStateHelper.getDayText(dayIndex) + ' ' + FutureStateHelper.getHourText(parseInt(hourIndex));
  };

  return FutureStateHelper;
});
