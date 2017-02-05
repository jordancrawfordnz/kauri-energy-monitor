'use strict';

/**
 * @ngdoc function
 * @name offgridmonitoringApp.controller:CollectionConfigCtrl
 * @description
 * # CollectionConfigCtrl
 * A tab for the building configuration page to allow users to set data collection options.
 */
angular.module('offgridmonitoringApp').controller('CollectionConfigCtrl', function ($scope, Building, SensorTypes) {
  $scope.sensorTypes = SensorTypes;

  $scope.bridgesWithSensors = Building.bridges({
    id: $scope.building.id,
    filter : {
      include : ['sensors']
    }
  });
});
