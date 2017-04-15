'use strict';

/**
 * @ngdoc function
 * @name kauriApp.directive:stateOfChargeGraph
 * @description
 * # stateOfChargeGraph
 * Shows a graph of state of charge, the current charge level, and the charge capacity.
 */

angular.module('kauriApp')
	.directive('stateOfChargeGraph', function() {
	  return {
	    restrict: 'A', // to be used via an attribute
	    controller: ['$rootScope', '$scope', function($rootScope, $scope) {
	    	// SoC chart configuration
		    $scope.socChartOptions = {
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
		            var value
		            if (tooltipItem.datasetIndex === 2) {
		              value = tooltipItem.yLabel.toFixed(0) + '%'; 
		            } else {
		              value = tooltipItem.yLabel.toFixed(0) + 'Wh'; 
		            }
		            return label + ': ' + value;
		          }
		        }
		      },
		      scales: {
		        yAxes: [
		          {
		            type: 'linear',
		            display: true,
		            scaleLabel: {
		              display: true,
		              labelString: 'Battery Level (Wh)'
		            },
		            ticks: {
		            	beginAtZero: true
		            }
		          },
		          {
		            type: 'linear',
		            display: true,
		            id: 'percentageAxis',
		            position: 'right',
		            scaleLabel: {
		              display: true,
		              labelString: 'State of Charge (%)'
		            },
		            ticks: {
		            	suggestedMax: 100,
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

		    // Setup the datasets
		    $scope.socChartDatasets = [
		      {
		        label: 'Current Charge Level',
		        fill : true,
		        pointRadius: 0,
		        pointHitRadius: 4
		      },
		      {
		        label: 'Battery Capacity',
		        fill : true,
		        pointRadius: 0,
		        pointHitRadius: 4
		      },
		      {
		        color : 'red',
		        label : 'State of Charge',
		        yAxisID : 'percentageAxis',
		        fill : false,
		        pointRadius: 0,
		        pointHitRadius: 4
		      }
		    ];

		    // Refresh the chart using the current states.
		    $scope.refreshChart = function() {
		    	$scope.socChartLabels = [];
        		
        		var chargeLevelData = [];
		        var capacityData = [];
		        var stateOfCharge = [];
		        $scope.socChartData = [chargeLevelData, capacityData, stateOfCharge];

		        angular.forEach($scope.states, function(state) {
        			$scope.socChartLabels.push(state.timestamp);
          			chargeLevelData.push(state.currentChargeLevel);
			        capacityData.push(state.batteryCapacity);
			        stateOfCharge.push(state.currentChargeLevel / state.batteryCapacity * 100);  
        		});
		    };

		    $scope.$watchCollection('states', $scope.refreshChart); // Refresh the chart when the states change.
	    }],
	    scope: {
	    	states : '=states',
	    	height : '=height'
	    },
	    template: '<canvas height="{{height}}" id="line" class="chart chart-line" chart-data="socChartData" ' + 
			' chart-labels="socChartLabels" chart-options="socChartOptions" chart-dataset-override="socChartDatasets"></canvas>'
	  };
	});