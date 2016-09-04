'use strict';

/**
 * @ngdoc function
 * @name offgridmonitoringApp.directive:energySourceGraph
 * @description
 * # energySourceGraph
 * Shows a graph of the energy sources.
 */

angular.module('offgridmonitoringApp')
	.directive('energySourceGraph', function() {
	  return {
	    restrict: 'A', // to be used via an attribute
	    controller: ['$rootScope', '$scope', 'ChartColours', 'ChartHelper', function($rootScope, $scope, ChartColours, ChartHelper) {
	    	// Energy source chart configuration
		    $scope.energySourceChartOptions = {
		      legend: {
		        display: true
		      },
		      tooltips: {
		        callbacks : ChartHelper.getEnergySourceChartCallbacks()
		      },
		      scales: {
		        yAxes: [
		          {
		            type: 'linear',
		            display: true,
		            stacked: true,
		            scaleLabel: {
		              display: true,
		              labelString: 'Energy provided (Wh)'
		            },
                	afterDataLimits : function(scale) {
		              if ($scope.building) {
		              	ChartHelper.setTickColour(scale, $scope.building.standardDailyEnergyAxis);
		              }
		            },
		            ticks: {
		              callback: function(tickData) {
		                // Make ticks below 0 show as positive values.
		                return Math.abs(tickData);
		              },
		              beginAtZero: true
		            }
		          }
		        ],
		        xAxes: [
		          {
		            type: 'time',
		            time: {
		              parser: 'X'
		            },
		            display: true
		          }
		        ]
		      }
		    };

		    // Refresh the chart using the current states.
		    $scope.refreshChart = function() {
		    	$scope.energySourceChartLabels = [];

		       	// == Get all energy sources
		       	var energySourceDetails = ChartHelper.getEnergySourceDetails($scope.building);
		       	var allEnergySources= energySourceDetails.sources;
		       	var allSourceOrder = energySourceDetails.order;

		       	// == Setup axis' and the data array.
		        $scope.energySourceChartData = [];
		        $scope.energySourceChartDatasets = [];

		        angular.forEach(allSourceOrder, function(energySource) {
		        	$scope.energySourceChartData.push(energySource.data);
		          	$scope.energySourceChartDatasets.push(ChartHelper.getEnergySourceDatasetTemplate(energySource.label, energySource.colour));
		        });

		        // == Fill in graph data with information from the states.
		        var previousState;
		        var maximumValueSeen = 0;
		        angular.forEach($scope.states, function(state) {
		        	var fillInMidnightZero = false;
		          	if (previousState && ChartHelper.hasMissedEndOfDay(Math.abs(state.timestamp - previousState.timestamp), state.timestamp, $scope.isReverseOrder)) {
		            	// If the end of the day is not included in this data set, for daily source totals we know these will be zero so can add this data in.
		              	// The absolute value is used because the sort order can be reversed.
		            	$scope.energySourceChartLabels.push(ChartHelper.getLastMidnightTimestamp(state.timestamp, $scope.isReverseOrder));
		            	fillInMidnightZero = true;
		          	}
		          	$scope.energySourceChartLabels.push(state.timestamp);

		          	angular.forEach(allEnergySources, function(energySource, energySourceId) {
		            	var sourceData = state.sources[energySourceId];
		            	if (sourceData) {
		              		if (fillInMidnightZero) {
		                		energySource.data.push(0);
		              		}
		              		if (sourceData.dailyCharge > maximumValueSeen) {
		              			maximumValueSeen = sourceData.dailyCharge;
		              		}
		              		if (energySource.isRenewable) {
		                		energySource.data.push(sourceData.dailyCharge); 
		              		} else {
		                		energySource.data.push(-sourceData.dailyCharge); 
		              		}
		            	}
		          	});
		          	previousState = state;
		        });

		        $scope.energySourceChartOptions.scales.yAxes[0].ticks.suggestedMax = $scope.building.standardDailyEnergyAxis;
				$scope.energySourceChartOptions.scales.yAxes[0].ticks.suggestedMin = -$scope.building.standardDailyEnergyAxis;
		    };

		    $scope.$watchCollection('states', $scope.refreshChart); // Refresh the chart when the states change.
	    }],
	    scope: {
	    	states : '=states',
	    	building : '=building',
	    	isReverseOrder : '=isReverseOrder'
	    },
	    template: '<canvas id="line" class="chart chart-line" chart-data="energySourceChartData"'
			+ 'chart-labels="energySourceChartLabels" chart-options="energySourceChartOptions" '
			+ 'chart-dataset-override="energySourceChartDatasets"></canvas>'
	  };
	});