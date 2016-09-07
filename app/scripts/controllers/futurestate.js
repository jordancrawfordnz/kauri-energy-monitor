'use strict';

/**
 * @ngdoc function
 * @name offgridmonitoringApp.controller:FutureStateCtrl
 * @description
 * # FutureStateCtrl
 * Displays estimations of the future state of the system and the source data for these estimations.
 */
angular.module('offgridmonitoringApp')
  .controller('FutureStateCtrl', function ($scope, Building, $routeParams, Breadcrumbs, Breadcrumb, ChartColours, FutureStateHelper) {
  	var _this = this;

    $scope.hourIndexes = FutureStateHelper.hourIndexes;
    $scope.getHourText = FutureStateHelper.getHourText;
    $scope.getDayText = FutureStateHelper.getDayText;

    $scope.averageConsumptionLabels = [];
    
    $scope.averageConsumptionData = [
      []
    ];
    $scope.averageConsumptionOptions = {
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
              labelString: 'Energy consumed (Wh)'
            },
          }
        ]
      }
    };
    
    $scope.building = Building.findById({
      id : $routeParams.buildingId,
      filter : {
        include : ['energySources']
      }
    });

    // Setup breadcrumbs.
    Breadcrumbs.addPlaceholder('Building', $scope.building.$promise, function(building) {
      return new Breadcrumb(building.name, '/' + $routeParams.buildingId);
    });
    Breadcrumbs.add(new Breadcrumb('Future State', '/' + $routeParams.buildingId + '/future', 'Estimations of the future state of the system and the data that powers it.'));

    $scope.building.$promise.then(function(building) {
      // Fill in consumption data.
      if (building.predictionPattern.data) {
        angular.forEach(building.predictionPattern.data.days, function(dayData, dayIndex) {
          angular.forEach(dayData, function(hourTotal, hourIndex) {
            $scope.averageConsumptionLabels.push(FutureStateHelper.getWeeklyPredictionPatternText(dayIndex, hourIndex));
            $scope.averageConsumptionData[0].push(hourTotal);
          });
        });

        // Use the proper chart colour.
        $scope.averageConsumptionDatasetOverride = [];
        $scope.averageConsumptionDatasetOverride.push($.extend({
          pointRadius: 0,
          pointHitRadius: 4
        }, ChartColours.getChartColourFields(building.houseConsumptionColour)));
      }
    });

  });
