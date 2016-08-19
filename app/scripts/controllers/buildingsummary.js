'use strict';

/**
 * @ngdoc function
 * @name offgridmonitoringApp.controller:BuildingSummaryCtrl
 * @description
 * # BuildingSummaryCtrl
 * Displays a summary of key indicators about a building.
 */
angular.module('offgridmonitoringApp')
  .controller('BuildingSummaryCtrl', function (Breadcrumb, Breadcrumbs, $routeParams, Building, Bridge, SensorTypes, State, $scope, $interval, ChartColours) {
  	var _this = this;

    this.building = Building.findById({
      id : $routeParams.buildingId,
      filter : {
        include : ['energySources', {'bridges' : 'sensors'}]
      }
    });

    this.energyFlowLabels = ['Consumption', 'Generation']

    this.energyFlowOptions = {
      legend: {
        display: true
      },
      tooltips: {
        callbacks : {
          label : function(tooltipItem, data) {
            var valueData = tooltipItem.yLabel;
            if (isNaN(valueData)) {
              return null; // Hide completely null values.
            }
            var label = data.datasets[tooltipItem.datasetIndex].label;
            var value = valueData.toFixed(0) + ' Watts';
            return label + ' : ' + value;
          }
        }
      },
      scales: {
        yAxes: [
          {
            scaleLabel: {
              display: true,
              labelString: 'Exponential Average Power (Watts)'
            },
            stacked: true
          }
        ],
        xAxes: [
          {
            stacked: true
          }
        ]
      }
    };

    this.batteryDiagramHeight = 200;

    // Gets the height for the battery level indicator.
    this.getBatteryLevelHeight = function() {
      var level = this.chargeLevel * this.batteryDiagramHeight;
      if (level > this.batteryDiagramHeight) {
        return this.batteryDiagramHeight;
      }
      if (level < 0) {
        return 0;
      }
      
      return level;
    };


    // Setup breadcrumbs.
    Breadcrumbs.addPlaceholder('Building', this.building.$promise, function(building) {
      return new Breadcrumb(building.name, '/' + $routeParams.buildingId);
    });

    this.building.$promise.then(function(building) {
      var bridge = building.bridges[0];
      
      // Load the summary then re-load it every minute after that.
      loadSummary(bridge);
      _this.refreshTimer = $interval(function() {
        loadSummary(bridge);
      }, 60*1000);
    });

    // Cancel the auto-refresh when the controller is destroyed.
    $scope.$on('$destroy', function() {
      if (_this.refreshTimer) {
        $interval.cancel(_this.refreshTimer);
      }
      if (_this.refresh24HourTimer) {
        $interval.cancel(_this.refresh24HourTimer);
      }
    });

    // Sets up the summary page.
    function loadSummary(bridge) {
      
      // Fetch down the current state.
      Building.currentState({
        id : $routeParams.buildingId
      }).$promise.then(function(currentState) {
        _this.state = currentState;
        _this.chargeLevel = currentState.currentChargeLevel / currentState.batteryCapacity;
        setupEnergyFlowGraph();
        
        // If don't have any data on the last 24 hour's states.
        if (!_this.last24HourStates) {
          // Get the current 24 hour data and refresh this every 10 minutes.
          get24HourData();
          _this.last24HourStates = $interval(function() {
            get24HourData();
          }, 10*60*1000);
        }
      });
    }

    function get24HourData() {
      // Get the latest 24 hours worth of data.
        // Get 30 minutely data.
      var timeWorth = 24*60*60;
      var stateInterval = 30*60;
      Building.states({
        id : _this.building.id,
        filter : {
          limit : timeWorth / stateInterval,
          order : 'timestamp desc'
        }
      }).$promise.then(function(states) {
        _this.last24HourStates = states;
      });
    }

    // Sets up the energy flow graph using the state and building data.
    function setupEnergyFlowGraph() {
      // === Prepare energy flow data.
      var energyFlowData = {
        consumption: [],
        generation: []
      };

      // Add consumption data.
      energyFlowData.consumption.push({
        name : 'Building',
        value : _this.state.consumption.averagePower,
        colour : _this.building.houseConsumptionColour
      });
      
      // Add energy source data.
      energyFlowData.generation.push({
        name : _this.building.chargerEnergySourceName,
        value : _this.state.sources.charger.averagePower,
        colour : _this.building.chargerGenerationColour
      });

      // Add custom sources.
      angular.forEach(_this.building.energySources, function(energySource) {
        var sourceState = _this.state.sources[energySource.id];
        if (sourceState) {
          energyFlowData.generation.push({
            name : energySource.name,
            value : sourceState.averagePower,
            colour : energySource.chartColour
          });
        }
      });

      // Add other source.
      energyFlowData.generation.push({
        name : _this.building.otherEnergySourceName,
        value : _this.state.sources.other.averagePower,
        colour : _this.building.otherGenerationColour
      });

      // === Setup energy flow data into the chart.js format.
      _this.energyFlowData = [];
      _this.energyFlowDatasetOverride = [];

      angular.forEach(energyFlowData.consumption, function(consumptionSeries) {
        var dataset = $.extend({
          label: consumptionSeries.name
        }, ChartColours.getChartColourFields(consumptionSeries.colour));
        _this.energyFlowDatasetOverride.push(dataset);
        _this.energyFlowData.push([consumptionSeries.value, null]);
      });

      angular.forEach(energyFlowData.generation, function(generationSeries) {
        var dataset = $.extend({
          label: generationSeries.name
        }, ChartColours.getChartColourFields(generationSeries.colour));
        _this.energyFlowDatasetOverride.push(dataset);
        _this.energyFlowData.push([null, generationSeries.value]);
      });
    }

  });
