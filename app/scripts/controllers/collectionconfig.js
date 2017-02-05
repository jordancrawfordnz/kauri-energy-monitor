'use strict';

/**
 * @ngdoc function
 * @name offgridmonitoringApp.controller:CollectionConfigCtrl
 * @description
 * # CollectionConfigCtrl
 * A tab for the building configuration page to allow users to set data collection options.
 */
angular.module('offgridmonitoringApp').controller('CollectionConfigCtrl', function ($scope, Building) {
  $scope.loadBridgesWithSensors = function() {
    $scope.bridgesWithSensors = Building.bridges({
      id: $scope.building.id,
      filter : {
        include : ['sensors']
      }
    });
  };

  $scope.loadBridgesWithSensors();

  $scope.createNewBridge = function() {
    Building.bridges.create({
      id: $scope.building.id
    }, $scope.newBridge).$promise.then(function() {
      $scope.showSuccess({ title: "Bridge created successfully." });
      $scope.loadBridgesWithSensors();
      $scope.newBridge = {};
    }, function() {
      $scope.showError({ title: "An error occured while creating a new bridge.", body: "Please try again." })
    });
  };
});
