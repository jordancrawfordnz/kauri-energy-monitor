'use strict';

/**
 * @ngdoc function
 * @name kauriApp.controller:BuildingSummaryCtrl
 * @description
 * # BuildingSummaryCtrl
 * Displays a summary of key indicators about a building.
 */
angular.module('kauriApp')
  .controller('BuildingSummaryCtrl',
    function (Breadcrumb, Breadcrumbs, $routeParams, Building, Bridge, SensorTypes, State, $scope, $interval, ChartColours, ChartHelper, FutureStateHelper) {

    var _this = this;

    this.predictionEvents = FutureStateHelper.predictionEvents;

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
            afterDataLimits : function(scale) {
              if (_this.building) {
                ChartHelper.setTickColour(scale, _this.building.standardPowerAxis);
              }
            },
            scaleLabel: {
              display: true,
              labelString: 'Exponential Average Power (Watts)'
            },
            stacked: true,
            ticks: {}
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
      // Load the summary then re-load it every minute after that.
      _this.loadSummary();
      _this.refreshTimer = $interval(function() {
        _this.loadSummary();
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

    // Refreshes all data used by this page.
    this.refreshPage = function() {
      this.loadSummary();
      this.get24HourData();
    };

    // Sets up the summary page.
    this.loadSummary = function() {
      // Fetch down the current state.
      Building.currentState({
        id : $routeParams.buildingId
      }).$promise.then(function(currentState) {
        if (currentState.currentChargeLevel) {
          _this.state = currentState;
          _this.chargeLevel = currentState.currentChargeLevel / currentState.batteryCapacity;
          if (_this.chargeLevel > 1) {
            _this.chargeLevel = 1;
          } else if (_this.chargeLevel < 0) {
            _this.chargeLevel = 0;
          }
          setupEnergyFlowGraph();

          // If don't have any data on the last 24 hour's states.
          if (!_this.last24HourStates) {
            // Get the current 24 hour data and refresh this every 10 minutes.
            _this.get24HourData();
            _this.last24HourStates = $interval(function() {
              _this.get24HourData();
            }, 10*60*1000);
          }
        } else {
          _this.state = null;
        }
      });
    };

    this.get24HourData = function() {
      // Get the latest 24 hours worth of data.
        // Get 30 minutely data.
      var timeWorth = 24*60*60;
      var stateInterval = 30*60;
      Building.states({
        id : _this.building.id,
        filter : {
          limit : timeWorth / stateInterval,
          order : 'timestamp desc',
          where: {timestamp : {mod : [stateInterval, 0]}}
        }
      }).$promise.then(function(states) {
        _this.last24HourStates = states;
      });
    };

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

      // Sort energy sources.
      ChartHelper.sortEnergySources(_this.building.energySources);

      // Add energy source data.
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

      // === Setup energy flow data into the chart.js format.
      _this.energyFlowData = [];
      _this.energyFlowDatasetOverride = [];

      var maximumValueSeen = 0;
      angular.forEach(energyFlowData.consumption, function(consumptionSeries) {
        var dataset = $.extend({
          label: consumptionSeries.name
        }, ChartColours.getChartColourFields(consumptionSeries.colour));
        _this.energyFlowDatasetOverride.push(dataset);
        if (consumptionSeries.value > maximumValueSeen) {
          maximumValueSeen = consumptionSeries.value;
        }
        _this.energyFlowData.push([consumptionSeries.value, null]);
      });

      angular.forEach(energyFlowData.generation, function(generationSeries) {
        var dataset = $.extend({
          label: generationSeries.name
        }, ChartColours.getChartColourFields(generationSeries.colour));
        _this.energyFlowDatasetOverride.push(dataset);
        if (generationSeries.value > maximumValueSeen) {
          maximumValueSeen = generationSeries.value;
        }
        _this.energyFlowData.push([null, generationSeries.value]);
      });

      _this.energyFlowOptions.scales.yAxes[0].ticks.suggestedMax = _this.building.standardPowerAxis;
    }

  });
