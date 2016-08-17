'use strict';

/**
 * @ngdoc function
 * @name offgridmonitoringApp.controller:BuildingSummaryCtrl
 * @description
 * # BuildingSummaryCtrl
 * Displays a summary of key indicators about a building.
 */
angular.module('offgridmonitoringApp')
  .controller('BuildingSummaryCtrl', function (Breadcrumb, Breadcrumbs, $routeParams, Building, Bridge, SensorTypes, State, $scope, $interval) {
  	var _this = this;

    this.building = Building.findById({
      id : $routeParams.buildingId,
      filter : {
        include : ['energySources', {'bridges' : 'sensors'}]
      }
    });

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
      });

      // TODO: Get 24 hour state data too.
    }

    // Sets up the energy flow graph using the state and building data.
    function setupEnergyFlowGraph() {
      _this.energyFlowLabels = [];
      _this.energyFlowData = [];

      // Add consumption data.
      _this.energyFlowLabels.push('Consumption');
      _this.energyFlowData.push(_this.state.consumption.averagePower);

      // Add energy source data.
      _this.energyFlowLabels.push('Generator');
      _this.energyFlowData.push(_this.state.sources.charger.averagePower);

      // Add custom sources.
      angular.forEach(_this.building.energySources, function(energySource) {
        var sourceState = _this.state.sources[energySource.id];
        if (sourceState) {
          _this.energyFlowLabels.push(energySource.name);
          _this.energyFlowData.push(sourceState.averagePower);
        }
      });

      // Add other source.
      _this.energyFlowLabels.push(_this.building.otherEnergySourceName);
      _this.energyFlowData.push(_this.state.sources.other.averagePower);
    }

  });
