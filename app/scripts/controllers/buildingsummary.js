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
        include : {'bridges' : 'sensors'}
      }
    });

    this.batteryDiagramHeight = 200;
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
      // Fetch the count of readings.
      Bridge.readings.count({
        id : bridge.id
      }).$promise.then(function(count) {
        _this.readingCount = count;
      });

      /* == Fetch down the current state.
       Display:
       - The current state of charge
       - (maybe) Today's total energy usage
       - The battery capacity
       - The charge efficiency.
      */
      Building.currentState({
        id : $routeParams.buildingId
      }).$promise.then(function(currentState) {
        _this.state = currentState;
        _this.chargeLevel = currentState.currentChargeLevel / currentState.batteryCapacity;
      });
    
      /* == Fetch down the latest sensor reading.
        TODO: Handle multipule bridges per building.
        This will just pull the latest reading which will only be for one of the bridges.

        Display:
        - all sensor readings with appropriate units for the latest reading
        - the time of the latest reading
      */
      // Get the latest reading for the bridge.
      Bridge.latestReading({
        id : bridge.id
      }).$promise.then(function(reading) {
        _this.sensorReadings = [];
        // Pair up the reading and its metadata.
        angular.forEach(bridge.sensors, function(sensor) {
          var sensorValue = reading.values[sensor.id];
          
          // If there is a value for this sensor ID, add the reading and metadata.
          if (sensorValue !== undefined) {
            _this.sensorReadings.push({
              value : sensorValue,
              metadata : sensor,
              typedata : SensorTypes[sensor.type]
            });
          }
        });
        _this.latestReadingTimestamp = reading.timestamp;
      });
    }

  });
