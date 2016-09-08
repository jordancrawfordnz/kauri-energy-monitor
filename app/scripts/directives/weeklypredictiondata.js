'use strict';

/**
 * @ngdoc function
 * @name offgridmonitoringApp.directive:weeklyPredictionData
 * @description
 * # weeklyPredictionData
 * Shows the data and a graph for a weekly prediction.
 */

angular.module('offgridmonitoringApp')
	.directive('weeklyPredictionData', function() {
	  return {
	    restrict: 'A', // to be used via an attribute
	    controller: ['$scope', 'FutureStateHelper', 'ChartColours', function($scope, FutureStateHelper, ChartColours) {
	    	$scope.hourIndexes = FutureStateHelper.hourIndexes;
		    $scope.getHourText = FutureStateHelper.getHourText;
		    $scope.getDayText = FutureStateHelper.getDayText;
		    
	    	$scope.averageConsumptionLabels = [];
    
		    $scope.averageConsumptionData = [
		    	[]
		    ];

		    $scope.dayTotals = {};

		    $scope.averageConsumptionOptions = FutureStateHelper.dataChartOptions;

		    $scope.$watch('predictionPattern', function() {
		    	// Fill in prediction data.
		      	if ($scope.predictionPattern) {
			        angular.forEach($scope.predictionPattern.data.days, function(dayData, dayIndex) {
			        	$scope.dayTotals[dayIndex] = 0;
			        	angular.forEach(dayData, function(hourTotal, hourIndex) {
			            	$scope.averageConsumptionLabels.push(FutureStateHelper.getWeeklyPredictionPatternText(dayIndex, hourIndex));
			            	$scope.averageConsumptionData[0].push(hourTotal);
			            	$scope.dayTotals[dayIndex] += hourTotal;
			          	});
			        });

			        // Use the proper chart colour.
			        $scope.averageConsumptionDatasetOverride = [];
			        $scope.averageConsumptionDatasetOverride.push($.extend({
			        	pointRadius: 0,
			          	pointHitRadius: 4
			        }, ChartColours.getChartColourFields($scope.colour)));
			    }
		    });
	    }],
	    scope: {
	    	predictionPattern : '=predictionPattern',
	    	colour : '=colour',
	    	height : '=height'
	    },
	    templateUrl: 'views/weeklypredictiondata.html'
	  };
	});