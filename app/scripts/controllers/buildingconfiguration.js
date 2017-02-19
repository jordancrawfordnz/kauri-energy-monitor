'use strict';

/**
 * @ngdoc function
 * @name offgridmonitoringApp.controller:BuildingConfigurationCtrl
 * @description
 * # BuildingConfigurationCtrl
 * Allows a user to edit config options related to a building.
 */
angular.module('offgridmonitoringApp').controller('BuildingConfigurationCtrl',
  function ($routeParams, $rootScope, $scope, Building, Breadcrumbs, Breadcrumb, $timeout) {

  var buildingId = $routeParams.buildingId;

  $scope.detailTabs = {
    'building' : 'Building and People',
    'collection' : 'Data Collection',
    'processing' : 'Data Processing'
  };
  $scope.activeDetailTab = 'building';

  function getBuilding() {
    $scope.building = Building.findById({
      id : buildingId
    });
  }

  // === Page Setup ===
  getBuilding();

  // Setup breadcrumbs.
  Breadcrumbs.addPlaceholder('Building', $scope.building.$promise, function(building) {
    return new Breadcrumb(building.name, '/' + buildingId);
  });

  Breadcrumbs.add(new Breadcrumb('Configuration', '/' + buildingId + '/configuration', 'Configure the building parameters and bridges.'));

  $scope.messages = [];

  $scope.showMessage = function(messageOptions) {
    messageOptions.remove = function() {
      $scope.messages.splice($scope.messages.indexOf(messageOptions), 1);
    };

    if (messageOptions.removeAfter) {
      $timeout(function() {
        messageOptions.remove();
      }, messageOptions.removeAfter);
    }

    $scope.messages.push(messageOptions);
  };

  $scope.showError = function(title, body) {
    $scope.showMessage({
      title: title,
      body: body,
      isSuccess: false
    });
  };

  $scope.showSuccess = function(title, body) {
    $scope.showMessage({
      title: title,
      body: body,
      isSuccess: true,
      removeAfter: 5000
    });
  };

  $scope.saveBuilding = function() {
    $scope.building.$save().then(function() {
      $scope.showSuccess("Building saved successfully", "Your changes to the building have been saved successfully.");
      $rootScope.$broadcast('refreshBuildings');
    }, function() {
      $scope.showError("Saving building failed", "An error occured while trying to save changes to the building. Please try again.");
    });
  };
});
