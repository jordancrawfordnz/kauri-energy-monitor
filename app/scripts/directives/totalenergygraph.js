'use strict';

/**
 * @ngdoc function
 * @name offgridmonitoringApp.directive:totalEnergyGraph
 * @description
 * # totalEnergyGraph
 * Shows a graph of the total energy.
 */

angular.module('offgridmonitoringApp')
	.directive('totalEnergyGraph', function() {
	  return {
	    restrict: 'A', // to be used via an attribute
	    controller: ['$rootScope', '$scope', 'ChartColours', 'ChartHelper', function($rootScope, $scope, ChartColours, ChartHelper) {
	    	// Total energy chart configuration
		    $scope.chartOptions = {
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
		              labelString: 'Daily energy (Wh)'
		            },
		            afterDataLimits : function(scale) {
		              if ($scope.building) {
		              	ChartHelper.setTickColour(scale, $scope.building.standardDailyEnergyAxis);
		              }
		            },
		            ticks: {
		            	beginAtZero: true
		            }
		          },
		          { display: false,
		          	id: 'consumptionAxis',
		          	ticks: {
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
		    	$scope.chartLabels = [];

		       	// == Get all energy sources
		       	var energySourceDetails = ChartHelper.getEnergySourceDetails($scope.building);
		       	var allEnergySources= energySourceDetails.sources;
		       	var allSourceOrder = energySourceDetails.order;

		       	// == Setup axis' and the data array.
		        $scope.chartData = [];
		        $scope.chartDatasets = [];

		        angular.forEach(allSourceOrder, function(energySource) {
		        	$scope.chartData.push(energySource.data);
		          	$scope.chartDatasets.push(ChartHelper.getEnergySourceDatasetTemplate(energySource.label, energySource.colour));
		        });

		        var consumptionData = [];
		        $scope.chartData.push(consumptionData);
		        $scope.chartDatasets.push($.extend({
		        	label: 'Consumption',
        			pointRadius: 0,
        			pointHitRadius: 4,
        			lineTension: 0.1,
        			borderDash: [10,5],
        			fill: false,
        			yAxisID : 'consumptionAxis'
      			}, ChartColours.getChartColourFields($scope.building.houseConsumptionColour)));

		        // == Fill in graph data with information from the states.
		        var previousState;
		        var maximumValueSeen = 0;
		        angular.forEach($scope.states, function(state) {
		        	var fillInMidnightZero = false;
		          	if (previousState && ChartHelper.hasMissedEndOfDay(Math.abs(state.timestamp - previousState.timestamp), state.timestamp, $scope.isReverseOrder)) {
		            	// If the end of the day is not included in this data set, for daily source totals we know these will be zero so can add this data in.
		              	// The absolute value is used because the sort order can be reversed.
		            	$scope.chartLabels.push(ChartHelper.getLastMidnightTimestamp(state.timestamp, $scope.isReverseOrder));
		            	fillInMidnightZero = true;
		          	}
		          	$scope.chartLabels.push(state.timestamp);

		          	angular.forEach(allEnergySources, function(energySource, energySourceId) {
		            	var sourceData = state.sources[energySourceId];
		            	if (sourceData) {
		              		if (fillInMidnightZero) {
		                		energySource.data.push(0);
		              		}
		              		if (sourceData.dailyCharge > maximumValueSeen) {
		              			maximumValueSeen = sourceData.dailyCharge;
		              		}
		              		energySource.data.push(sourceData.dailyCharge);
		            	}
		          	});

		          	if (fillInMidnightZero) {
		          		consumptionData.push(0);
		          	}
		          	consumptionData.push(state.consumption.dailyTotal);
		          	if (state.consumption.dailyTotal > maximumValueSeen) {
		          		maximumValueSeen = state.consumption.dailyTotal;
		          	}

		          	previousState = state;
		        });

		        $scope.chartOptions.scales.yAxes[0].ticks.suggestedMax = $scope.building.standardDailyEnergyAxis;
		        $scope.chartOptions.scales.yAxes[1].ticks.suggestedMax = $scope.building.standardDailyEnergyAxis;
		    };

		    $scope.$watchCollection('states', $scope.refreshChart); // Refresh the chart when the states change.
	    }],
	    scope: {
	    	states : '=states',
	    	building : '=building',
	    	isReverseOrder : '=isReverseOrder',
	    	height : '=height'
	    },
	    template: '<canvas id="line" height="{{height}}" class="chart chart-line" chart-data="chartData"'
			+ 'chart-labels="chartLabels" chart-options="chartOptions" '
			+ 'chart-dataset-override="chartDatasets"></canvas>'
	  };
	});