'use strict';

/**
 * @ngdoc function
 * @name offgridmonitoringApp.controller:BridgeSensorsCtrl
 * @description
 * # BridgeSensorsCtrl
 * The interface to view and edit a bridges sensors.
 */
angular.module('offgridmonitoringApp').controller('BridgeSensorsCtrl', function ($scope, Bridge, SensorTypes) {
  $scope.sensorTypes = SensorTypes;

  // TODO
});
