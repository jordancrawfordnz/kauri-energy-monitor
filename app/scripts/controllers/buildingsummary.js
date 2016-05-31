'use strict';

/**
 * @ngdoc function
 * @name offgridmonitoringApp.controller:BuildingSummaryCtrl
 * @description
 * # BuildingSummaryCtrl
 * Displays a summary of key indicators about a building.
 */
angular.module('offgridmonitoringApp')
  .controller('BuildingSummaryCtrl', function (Breadcrumb, Breadcrumbs, $routeParams, Building, Bridge, SensorTypes) {
  	var _this = this;

    this.building = Building.findById({
      id : $routeParams.buildingId,
      filter : {
        include : {'bridges' : 'sensors'}
      }
    });

    // Setup breadcrumbs.
    Breadcrumbs.addPlaceholder('Building', this.building.$promise, function(building) {
      return new Breadcrumb(building.name, '/' + $routeParams.buildingId);
    });

    /* == Fetch down the latest sensor reading.
      TODO: Handle multipule bridges per building.
      This will just pull the latest reading which will only be for one of the bridges.

      Display:
      - all sensor readings with appropriate units for the latest reading
      - the time of the latest reading
    */
    
    this.building.$promise.then(function(building) {
      var bridge = building.bridges[0];

      // Fetch the count of readings.
      _this.readingCount = Bridge.readings.count({
        id : bridge.id
      });

      // Get the latest reading for the bridge.
      Bridge.latestReading({
        id : bridge.id
      }).$promise.then(function(reading) {
        _this.sensorReadings = [];
        // Pair up the reading and its metadata.
        angular.forEach(bridge.sensors, function(sensor) {
          var sensorValue = reading.values[sensor.id];
          
          // If there is a value for this sensor ID, add the reading and metadata.
          if (sensorValue) {
            _this.sensorReadings.push({
              value : sensorValue,
              metadata : sensor,
              typedata : SensorTypes[sensor.type]
            });
          }
        });
        _this.latestReadingTimestamp = reading.timestamp;
      });
    });

  });
