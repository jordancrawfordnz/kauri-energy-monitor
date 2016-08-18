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
	    controller: ['$rootScope', '$scope', 'ChartColours', function($rootScope, $scope, ChartColours) {
	    	// Energy source chart configuration
		    $scope.energySourceChartOptions = {
		      legend: {
		        display: true
		      },
		      tooltips: {
		        callbacks : {
		          title : function(tooltips, data) {
		            return moment.unix(tooltips[0].xLabel).format($rootScope.dateTimeFormat);
		          },
		          label : function(tooltipItem, data) {
		            var label = data.datasets[tooltipItem.datasetIndex].label;
		            var value = Math.abs(tooltipItem.yLabel).toFixed(0) + 'Wh'; 
		            return label + ': ' + value;
		          }
		        }
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
		            ticks: {
		              callback: function(tickData) {
		                // Make ticks below 0 show as positive values.
		                return Math.abs(tickData);
		              }
		            }
		          }
		        ],
		        xAxes: [
		          {
		            type: 'time',
		            time: {
		              parser: 'X',
		              unit: 'day'
		            },
		            display: true
		          }
		        ]
		      }
		    };


		    function getAmountOutFromMidnight(timestamp, reverseOrder) {
		      var offset = (timestamp - 60*60*12 - 1) % (60*60*24); // match on midday GMT which is midnight in +12 NZ.
		      if (reverseOrder) {
		        offset = (60*60*24) - offset;
		      }
		      return offset;
		    }

		    // Gets the timestamp of the last midnight.
		    function getLastMidnightTimestamp(timestamp, reverseOrder) {
		      var outBy = getAmountOutFromMidnight(timestamp, reverseOrder);
		      if (reverseOrder){
		        return timestamp + outBy; 
		      } else {
		        return timestamp - outBy;
		      }
		    }

		    // Returns true if the end of the day has been missed.
		    function hasMissedEndOfDay(timeSinceLastReading, currentTimestamp, reverseOrder) {
		      var outBy = getAmountOutFromMidnight(currentTimestamp, reverseOrder);
		      // Either the timestamp is perfectly on midnight or midnight was missed.
		      return outBy < timeSinceLastReading;    
		    }

		    function getEnergySourceDatasetTemplate(label, colourKey) {
		      return $.extend({
		        label: label,
		        fill: true,
		        pointRadius: 0,
		        pointHitRadius: 4,
		        lineTension: 0.1
		      }, ChartColours.getChartColourFields(colourKey));
		    }

		    // Refresh the chart using the current states.
		    $scope.refreshChart = function() {
		    	$scope.energySourceChartLabels = [];

		        var chargerDailyCharge = [];
		        var otherDailyCharge = [];
		        
		        var renewableEnergySources = {
		          other : {
		            data : [],
		            label: $scope.building.otherEnergySourceName,
		            colour: $scope.building.otherGenerationColour
		          }
		        };
		        var renewableSourceOrder = [renewableEnergySources.other];
		        
		        var nonRenewableEnergySources = {
		          charger : {
		            data : [],
		            label: $scope.building.chargerEnergySourceName,
		            colour: $scope.building.chargerGenerationColour
		          }
		        };
		        var nonRenewableSourceOrder = [nonRenewableEnergySources.charger];

                // Setup the remaining energy sources,
		        angular.forEach($scope.building.energySources, function(source) {
		          renewableEnergySources[source.id] = {
		            data : [],
		            label: source.name,
		            colour: source.chartColour
		          };
		          renewableSourceOrder.unshift(renewableEnergySources[source.id]); // Make this source to go the front.
		        });

		        var allEnergySources = $.extend({}, renewableEnergySources, nonRenewableEnergySources);

		        // Setup axis' and the data array.
		        $scope.energySourceChartData = [];
		        $scope.energySourceChartDatasets = [];

		        for (var nonRenewableSourceIndex = 0; nonRenewableSourceIndex < nonRenewableSourceOrder.length; nonRenewableSourceIndex++) {
		          var energySource = nonRenewableSourceOrder[nonRenewableSourceIndex];
		          $scope.energySourceChartData.push(energySource.data);
		          $scope.energySourceChartDatasets.push(getEnergySourceDatasetTemplate(energySource.label, energySource.colour));
		        }

		        for (var renewableSourceIndex = 0; renewableSourceIndex < renewableSourceOrder.length; renewableSourceIndex++) {
		          var energySource = renewableSourceOrder[renewableSourceIndex];
		          $scope.energySourceChartData.push(energySource.data);
		          $scope.energySourceChartDatasets.push(getEnergySourceDatasetTemplate(energySource.label, energySource.colour));
		        }

		        // Fill in graph data with information from the states.
		        var previousState;
		        angular.forEach($scope.states, function(state) {
		        	var fillInMidnightZero = false;
		          	if (previousState && hasMissedEndOfDay(Math.abs(state.timestamp - previousState.timestamp), state.timestamp, $scope.isReverseOrder)) {
		            	// If the end of the day is not included in this data set, for daily source totals we know these will be zero so can add this data in.
		              	// The absolute value is used because the sort order can be reversed.
		            	$scope.energySourceChartLabels.push(getLastMidnightTimestamp(state.timestamp, $scope.isReverseOrder));
		            	fillInMidnightZero = true;
		          	}
		          	$scope.energySourceChartLabels.push(state.timestamp);

		          	angular.forEach(allEnergySources, function(energySource, energySourceId) {
		            	var sourceData = state.sources[energySourceId];
		            	if (sourceData) {
		              		if (fillInMidnightZero) {
		                		energySource.data.push(0);
		              		}
		              		if (nonRenewableSourceOrder.indexOf(energySource) !== -1) {
		                		energySource.data.push(-sourceData.dailyCharge); 
		              		} else {
		                		energySource.data.push(sourceData.dailyCharge); 
		              		}
		            	}
		          	});
		          	previousState = state;
		        });
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