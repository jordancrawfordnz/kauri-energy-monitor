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
				              labelString: 'Hourly energy (Wh)'
				            }
			         	}
		        	]
		      	}
		    };

		    $scope.$watch('predictionPattern', function() {
		    	// Fill in consumption data.
		      	if ($scope.predictionPattern) {
			        angular.forEach($scope.predictionPattern.data.days, function(dayData, dayIndex) {
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