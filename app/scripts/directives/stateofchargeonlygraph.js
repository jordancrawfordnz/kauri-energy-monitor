'use strict';

/**
 * @ngdoc function
 * @name offgridmonitoringApp.directive:stateOfChargeOnlyGraph
 * @description
 * # stateOfChargeOnlyGraph
 * Shows a graph of state of charge.
 */

angular.module('offgridmonitoringApp')
	.directive('stateOfChargeOnlyGraph', function() {
	  return {
	    restrict: 'A', // to be used via an attribute
	    controller: ['$rootScope', '$scope', function($rootScope, $scope) {
	    	// SoC chart configuration
		    $scope.socChartOptions = {
		      tooltips: {
		        callbacks : {
		          title : function(tooltips, data) {
		            return moment.unix(tooltips[0].xLabel).format($rootScope.dateTimeFormat);
		          },
		          label : function(tooltipItem, data) {
		            var label = data.datasets[tooltipItem.datasetIndex].label;
		            var value = tooltipItem.yLabel.toFixed(0) + '%'; 
		            return label + ': ' + value;
		          }
		        }
		      },
		      scales: {
		        yAxes: [
		          {
		            type: 'linear',
		            display: true,
		            id: 'percentageAxis',
		            scaleLabel: {
		              display: true,
		              labelString: 'State of Charge (%)'
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

		    var lineColour = 'red';
		    // Setup the datasets
		    $scope.socChartDatasets = [
		      {
		        borderColor : lineColour,
		        pointHoverBorderColor: lineColour,
            	pointHoverBackgroundColor: lineColour,
            	label : 'State of Charge',
		        fill : false,
		        pointRadius: 0,
		        pointHitRadius: 4
		      }
		    ];

		    // Refresh the chart using the current states.
		    $scope.refreshChart = function() {
		    	$scope.socChartLabels = [];
        		
        		var stateOfCharge = [];
		        $scope.socChartData = [stateOfCharge];

		        angular.forEach($scope.states, function(state) {
        			$scope.socChartLabels.push(state.timestamp);
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