'use strict';

var app = angular.module('offgridmonitoringApp');
    
// Provides functions that helps with the future state estimations.
app.factory('FutureStateHelper', function(ChartColours, $rootScope) {
  var FutureStateHelper = {};

  FutureStateHelper.hourIndexes = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23];
  FutureStateHelper.daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  FutureStateHelper.getHourText = function(hourIndex) {
    hourIndex = parseInt(hourIndex);
    var number;
    if (hourIndex === 0) {
      number = 12;
    } else if (hourIndex < 13) {
      number = hourIndex;
    } else {
      number = hourIndex - 12;
    }
    if (hourIndex < 12) {
      return number + 'am';
    } else {
      return number + 'pm';
    }
  };

  FutureStateHelper.getDayText = function(dayIndex) {
    return FutureStateHelper.daysOfWeek[dayIndex];
  };

  FutureStateHelper.getWeeklyPredictionPatternText = function(dayIndex, hourIndex) {
    return FutureStateHelper.getDayText(dayIndex) + ' ' + FutureStateHelper.getHourText(hourIndex);
  };

  FutureStateHelper.dataChartOptions = {
      tooltips: {
        callbacks : {
          title : function(tooltips, data) {
              return tooltips[0].xLabel;
            },
            label : function(tooltipItem, data) {
              var value = Math.abs(tooltipItem.yLabel).toFixed(0) + 'Wh'; 
              return value;
            }
        }
      },
      scales: {
        yAxes: [
            {
              type: 'linear',
              display: true,
              position: 'left',
              ticks : {
                beginAtZero: true
              },
              scaleLabel: {
                display: true,
                labelString: 'Hourly energy (Wh)'
              }
          }
        ]
      }
  };

  FutureStateHelper.predictionEvents = {
    fullyCharged : {
      name : 'Fully charged'
    },
    empty : {
      name : 'Empty'
    }
  };

  return FutureStateHelper;
});
