'use strict';

/**
 * @ngdoc function
 * @name offgridmonitoringApp.controller:BridgeCtrl
 * @description
 * # BridgeCtrl
 * The interface to view a single bridge and edit it's sensors.
 */
angular.module('offgridmonitoringApp').controller('BridgeCtrl', function ($scope, Bridge, SensorTypes) {
  $scope.sensorTypes = SensorTypes;

  // TODO
});
