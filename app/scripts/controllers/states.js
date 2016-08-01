'use strict';

/**
 * @ngdoc function
 * @name offgridmonitoringApp.controller:StatesCtrl
 * @description
 * # StatesCtrl
 * Provides a paginated view of states and a graph of state over time.
 */
angular.module('offgridmonitoringApp')
  .controller('StatesCtrl', function ($rootScope, $scope, $routeParams, Building, Breadcrumb, Breadcrumbs, State, Timestamp) {
    /*
      Allows:
        - select a date range to display
        - paginated view of states
        - define a sort order, most recent first or oldest first.
        - define the time period between states.
        - graph of states

      The page starts at 1 which will map to page 0 in API calls.
    */
    $scope.detailTabs = {
      'socgraph' : 'State of Charge',
      'energysourcegraph' : 'Energy Sources'
    };
    $scope.activeDetailTab = 'socgraph';

    // == SoC chart configuration
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

    // == Energy source chart configuration
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
            var value = tooltipItem.yLabel.toFixed(0) + 'Wh'; 
            return label + ': ' + value;
          }
        }
      },
      scales: {
        yAxes: [
          {
            type: 'linear',
            display: true,
            id: 'renewableAxis',
            stacked: true,
            scaleLabel: {
              display: true,
              labelString: 'Energy provided by renewable sources (Wh)'
            },
          },
          {
            type: 'linear',
            display: true,
            id: 'nonRenewableAxis',
            stacked: true,
            position: 'right',
            scaleLabel: {
              display: true,
              labelString: 'Energy provided by non-renewable sources (Wh)'
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

    $scope.amountPerPage = '50';
    $scope.debounceTime = 500;
    $scope.currentPage = 1;
    $scope.sortOrder = 'desc';
    $scope.displayEvery = 6*60*60;
    $scope.displayEveryLevels = [
      {
        name : 'Original'
      },
      {
        name : '30 Minutes',
        period : 30*60
      },
      {
        name : 'Hour',
        period : 60*60
      },
      {
        name : '3 Hours',
        period : 3*60*60
      },
      {
        name : '6 Hours',
        period : 6*60*60
      },
      {
        name : '12 Hours',
        period : 12*60*60
      },
      {
        name : 'Day',
        period : 24*60*60
      },
      {
        name : 'Week',
        period : 7*24*60*60
      }
    ];

    $scope.building = Building.findById({
      id : $routeParams.buildingId,
      filter : {
        include : 'energySources'
      }
    });
    // Setup breadcrumbs.
    Breadcrumbs.addPlaceholder('Building', $scope.building.$promise, function(building) {
      return new Breadcrumb(building.name, '/' + $routeParams.buildingId);
    });

    function getAmountOutFromMidnight(timestamp) {
      return (timestamp - 60*60*12 - 1) % (60*60*24); // match on midday GMT which is midnight in +12 NZ.
    }

    // Gets the timestamp of the last midnight.
    function getLastMidnightTimestamp(timestamp) {
      var outBy = getAmountOutFromMidnight(timestamp);
      return timestamp - outBy;
    }

    // Returns true if the end of the day has been missed.
    function hasMissedEndOfDay(timeSinceLastReading, currentTimestamp) {
      var outBy = getAmountOutFromMidnight(currentTimestamp);
      // Either the timestamp is perfectly on midnight or midnight was missed.
      return outBy < timeSinceLastReading;    
    }

    // Converts a hex colour like FFFFFF to an object with red, green and blue components.
    function seperateHexColour(hex) {
      var asInteger = parseInt(hex, 16);
      return {
        red : (asInteger >> 16) & 255,
        green : (asInteger >> 8) & 255,
        blue : asInteger & 255
      };
    }

    // Converts a hex object of the red, green and blue components to a rgba string with some alpha level.
    function hexColourToRGBA(hexColour, alphaLevel) {
      return 'rgba(' + hexColour.red + ', ' + hexColour.green + ', ' + hexColour.blue + ', ' + alphaLevel + ')';
    }

    $scope.energySources = {
      'charger' : 'Generator'
    };
    $scope.building.$promise.then(function(building) {
      $scope.energySources.other = building.otherEnergySourceName;
      angular.forEach(building.energySources, function(energySource) {
        $scope.energySources[energySource.id] = energySource.name;
      });
      // Initialise the count and the search.
      $scope.recountSearch();
      $scope.refreshSearch();
    });

    Breadcrumbs.add(new Breadcrumb('Battery State', '/' + $routeParams.buildingId + '/states', 'See a paginated view of states for a date range.'));

    // Re-counts the number of results in the search when the filters change.
    $scope.recountSearch = function() {
      if (!$scope.building.id) return;
      Building.states.count({
        id : $scope.building.id,
        where : Timestamp.getRangeWhereFilter($scope.from, $scope.until, $scope.displayEvery)
      }).$promise.then(function(count) {
        $scope.totalStates = count.count;
      });
    };
    $scope.$watchGroup(['from', 'until', 'displayEvery'], $scope.recountSearch);


    function getEnergySourceDatasetTemplate(label, colourToUse, yAxisID) {
      return {
        label: label,
        fill: true,
        pointRadius: 0,
        pointHitRadius: 4,
        backgroundColor: hexColourToRGBA(colourToUse, 0.2),
        borderColor: hexColourToRGBA(colourToUse, 1),
        pointHoverBorderColor: hexColourToRGBA(colourToUse, 1),
        pointHoverBackgroundColor: hexColourToRGBA(colourToUse, 1),
        yAxisID : yAxisID
      };
    }

    // Refresh the search results.
    $scope.refreshSearch = function() {
      if (!$scope.building.id) return;
      
      $scope.states = Building.states({
        id : $scope.building.id,
        filter : {
          skip : ($scope.currentPage - 1) * $scope.amountPerPage,
          limit : $scope.amountPerPage,
          order : 'timestamp ' + $scope.sortOrder,
          where : Timestamp.getRangeWhereFilter($scope.from, $scope.until, $scope.displayEvery)
        }
      });

      $scope.states.$promise.then(function(states) {
        // Add data to the chart.
        $scope.socChartLabels = [];
        $scope.energySourceChartLabels = [];

        var chargeLevelData = [];
        var capacityData = [];
        var stateOfCharge = [];
        $scope.socChartData = [chargeLevelData, capacityData, stateOfCharge];

        var chargerDailyCharge = [];
        var otherDailyCharge = [];
        
        var nonRenewableSourceColours = [
          '4D4D4D'
        ];

        var renewableSourceColours = [
          'FAE500',
          '0085FA',
          '00FA43'
        ];

        var renewableEnergySources = {
          other : {
            data : [],
            label: $scope.building.otherEnergySourceName
          }
        };
        var renewableSourceOrder = [renewableEnergySources.other];
        
        var nonRenewableEnergySources = {
          charger : {
            data : [],
            label: 'Generator'
          }
        };
        var nonRenewableSourceOrder = [nonRenewableEnergySources.charger];

        // Setup the remaining energy sources,
        angular.forEach($scope.building.energySources, function(source) {
          renewableEnergySources[source.id] = {
            data : [],
            label: source.name
          };
          renewableSourceOrder.unshift(renewableEnergySources[source.id]); // Make this source to go the front.
        });

        var allEnergySources = $.extend({}, renewableEnergySources, nonRenewableEnergySources);

        // Setup axis' and the data array.
        $scope.energySourceChartData = [];
        $scope.energySourceChartDatasets = [];

        for (var renewableSourceIndex = 0; renewableSourceIndex < renewableSourceOrder.length; renewableSourceIndex++) {
          var energySource = renewableSourceOrder[renewableSourceIndex];
          $scope.energySourceChartData.push(energySource.data);
          var colourToUse = seperateHexColour(renewableSourceColours[renewableSourceIndex]);
          $scope.energySourceChartDatasets.push(getEnergySourceDatasetTemplate(energySource.label, colourToUse, 'renewableAxis'));
        }

        for (var nonRenewableSourceIndex = 0; nonRenewableSourceIndex < nonRenewableSourceOrder.length; nonRenewableSourceIndex++) {
          var energySource = nonRenewableSourceOrder[nonRenewableSourceIndex];
          $scope.energySourceChartData.push(energySource.data);
          var colourToUse = seperateHexColour(nonRenewableSourceOrder[nonRenewableSourceIndex]);
          $scope.energySourceChartDatasets.push(getEnergySourceDatasetTemplate(energySource.label, colourToUse, 'nonRenewableAxis'));
        }

        // Fill in graph data with information from the states.
        var previousState;
        angular.forEach(states, function(state) {
          var fillInMidnightZero = false;
          if (previousState && hasMissedEndOfDay(Math.abs(state.timestamp - previousState.timestamp), state.timestamp)) {
            // If the end of the day is not included in this data set, for daily source totals we know these will be zero so can add this data in.
              // The absolute value is used because the sort order can be reversed.
            $scope.energySourceChartLabels.push(getLastMidnightTimestamp(state.timestamp));
            fillInMidnightZero = true;
          }
          
          $scope.socChartLabels.push(state.timestamp);
          $scope.energySourceChartLabels.push(state.timestamp);

          chargeLevelData.push(state.currentChargeLevel);
          capacityData.push(state.batteryCapacity);
          stateOfCharge.push(state.currentChargeLevel / state.batteryCapacity * 100);

          angular.forEach(allEnergySources, function(energySource, energySourceId) {
            var sourceData = state.sources[energySourceId];
            if (sourceData) {
              if (fillInMidnightZero) {
                energySource.data.push(0);
              }
              energySource.data.push(sourceData.dailyCharge);
            }
          });
          previousState = state;
        });
      });
    };
    $scope.$watchGroup(['currentPage', 'sortOrder', 'from', 'until', 'amountPerPage', 'displayEvery'], $scope.refreshSearch);

  });
