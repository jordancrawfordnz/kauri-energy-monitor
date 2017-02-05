'use strict';

/**
 * @ngdoc function
 * @name offgridmonitoringApp.controller:CollectionConfigCtrl
 * @description
 * # CollectionConfigCtrl
 * A tab for the building configuration page to allow users to set data collection options.
 */
angular.module('offgridmonitoringApp').controller('CollectionConfigCtrl', function ($scope, Building) {
  $scope.loadBridges = function() {
    $scope.bridges = Building.bridges({
      id: $scope.building.id
    });
  };

  $scope.onBridgeChange = function() {
    $scope.loadBridges();
  };

  $scope.createNewBridge = function() {
    Building.bridges.create({
      id: $scope.building.id
    }, $scope.newBridge).$promise.then(function() {
      $scope.showSuccess({ title: "Bridge created successfully." });
      $scope.onBridgeChange();
      $scope.newBridge = {};
    }, function() {
      $scope.showError({ title: "An error occured while creating a new bridge.", body: "Please try again." })
    });
  };

  $scope.showBridgeDeleteConfirmation = function(bridge) {
    $scope.deleteConfirmationBridge = bridge;

    $("#deleteBridgeConfirmationModal").modal().show();
  };

  $scope.editBridge = function(bridge) {
    $scope.editBridgeCopy = angular.copy(bridge);

    $("#editBridgeModal").modal().show();
  };

  $scope.updateBridge = function(bridge) {
    bridge.$save().then(function() {
      $scope.showSuccess({ title: "Bridge saved successfully." });
      $scope.onBridgeChange();
    }, function() {
      $scope.showError({ title: "An error occured while saving the bridge.", body: "Please try again." })
    });
  };

  $scope.deleteBridge = function(bridge) {
    Building.bridges.destroyById({
      id: $scope.building.id,
      fk: bridge.id
    }).$promise.then(function(result) {
      $scope.showSuccess({ title: "Bridge deleted successfully." });
      $scope.onBridgeChange();
    }, function() {
      $scope.showError({ title: "An error occured while deleting a bridge.", body: "Please try again." })
    });
  };

  // Initial load.
  $scope.loadBridges();
});
