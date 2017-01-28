'use strict';

/**
 * @ngdoc function
 * @name offgridmonitoringApp.controller:BuildingConfigCtrl
 * @description
 * # BuildingConfigCtrl
 * Allows users to create or edit core building parameters.
 */
angular.module('offgridmonitoringApp').controller('BuildingConfigCtrl', function ($rootScope, $scope, Building, $timeout) {
  $scope.isCreate = function() {
    return !$scope.building.id;
  };

  $scope.saveBuilding = function() {
    var saveBuildingPromise;
    if (!$scope.isCreate()) {
      saveBuildingPromise = $scope.building.$save();
    } else {
      $scope.building = Building.create($scope.building);
      saveBuildingPromise = $scope.building.$promise;
    }

    saveBuildingPromise.then(function(data) {
      $scope.buildingSaveError = false;
      $scope.buildingSaveSuccess = true;
      $scope.wasCreate = $scope.isCreate();
      $timeout(function() {
        $scope.buildingSaveSuccess = false;
      }, 5*1000);

      $scope.onSaveSuccess(data);
    }, function() {
      // Display error message.
      $scope.buildingSaveError = true;
      $scope.buildingSaveSuccess = false;
    });
  };
});
