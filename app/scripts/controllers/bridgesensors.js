'use strict';

/**
 * @ngdoc function
 * @name offgridmonitoringApp.controller:BridgeSensorsCtrl
 * @description
 * # BridgeSensorsCtrl
 * The interface to view and edit a bridges sensors.
 */
angular.module('offgridmonitoringApp').controller('BridgeSensorsCtrl', function ($scope, Bridge, SensorTypes, $q) {
  $scope.sensors = [];
  $scope.sensorTypes = SensorTypes;

  Bridge.sensors({
    id : $scope.bridge.id
  }).$promise.then(function(sensors) {
    angular.forEach(sensors, function(sensorData) {
      $scope.sensors.push({
        data : sensorData,
        hasBeenSaved : true
      });
    });
  });

  // Creates an empty sensor.
  $scope.newSensor = function() {
    $scope.sensors.push({
      data : {},
      hasBeenSaved : false
    });
  };

  $scope.handleSensorPromise = function(promise, sensor, messageOptions) {
    promise.then(function(sensorData) {
      sensor.data = sensorData;
      sensor.hasBeenSaved = true;
      $scope.showSuccess({ title: messageOptions.successTitle, body: messageOptions.successBody });
    }, function() {
      $scope.showFailure({ title: messageOptions.failureTitle, body: messageOptions.failureBody });
    });
  };

  // Saves a sensor that has already been created.
  $scope.saveSensor = function(sensor) {
    $scope.handleSensorPromise(sensor.data.$save(), sensor, {
      successTitle: "Sensor saved successfully",
      failureTitle: "Sensor not saved",
      failureBody: "Please try again."
    });
  };

  // Performs a creation operation on a sensor.
  $scope.createSensor = function(sensor) {
    $scope.handleSensorPromise(Bridge.sensors.create({
      id : $scope.bridge.id
    }, sensor.data).$promise, sensor, {
      successTitle: "Sensor created successfully",
      failureTitle: "Sensor not created",
      failureBody: "Please try again."
    });
  };

  // Performs a deletion operation on a sensor.
  $scope.deleteSensor = function(sensor) {
    var index = $scope.sensors.indexOf(sensor);

    if (index !== -1) {
      var deletePromise;

      if (sensor.hasBeenSaved) {
        deletePromise = sensor.data.$delete();
        deletePromise.then(function() {
          $scope.showSuccess({ title: "Sensor deleted successfully" });
        }, function() {
          $scope.showFailure({ title: "Sensor not deleted", body: "Please try again." });
        });
      } else {
        deletePromise = $q.when(true);
      }

      deletePromise.then(function() {
        // Remove the sensor from the list.
        $scope.sensors.splice(index, 1);
      });
    }
  };
});
