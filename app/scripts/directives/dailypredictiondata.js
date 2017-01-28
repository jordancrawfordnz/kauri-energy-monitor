'use strict';

/**
 * @ngdoc function
 * @name offgridmonitoringApp.directive:dailyPredictionData
 * @description
 * # dailyPredictionData
 * Shows the data and a graph for a daily prediction.
 */

angular.module('offgridmonitoringApp')
	.directive('dailyPredictionData', function() {
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
		    $scope.averageConsumptionOptions = FutureStateHelper.dataChartOptions;

		    $scope.$watch('predictionPattern', function() {
		    	// Fill in prediction data.
		    	if ($scope.predictionPattern) {
		    		$scope.total = 0;
			        angular.forEach($scope.predictionPattern.data.hours, function(hourTotal, hourIndex) {
		        		$scope.averageConsumptionLabels.push(FutureStateHelper.getHourText(hourIndex));
		            	$scope.averageConsumptionData[0].push(hourTotal);
		            	$scope.total += hourTotal;
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
	    templateUrl: 'views/dailypredictiondata.html'
	  };
	});
