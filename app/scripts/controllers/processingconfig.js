'use strict';

/**
 * @ngdoc function
 * @name offgridmonitoringApp.controller:ProcessingConfigCtrl
 * @description
 * # ProcessingConfigCtrl
 * A tab for the building configuration page to allow users to set data processing options.
 */
angular.module('offgridmonitoringApp').controller('ProcessingConfigCtrl', function ($rootScope, $scope, Building, SensorTypes, $interval) {
  $scope.dateTimeFormat = $rootScope.dateTimeFormat;

  $scope.datePickerOptions = {
    icons : {
      next: 'glyphicon glyphicon-arrow-right',
      previous: 'glyphicon glyphicon-arrow-left',
      up: 'glyphicon glyphicon-arrow-up',
      down: 'glyphicon glyphicon-arrow-down'
    },
    format : $scope.dateTimeFormat,
    timeZone : 'Pacific/Auckland'
  };

  $scope.sensorTypes = SensorTypes;

  $scope.onlyProcessAfterObject = null;
  $scope.onlyProcessUntilObject = null;

  // === Event Watchers ===
  $scope.$watch('building.onlyProcessAfterObject', function() {
    if ($scope.building.onlyProcessAfter) {
      $scope.onlyProcessAfterObject = moment.unix($scope.building.onlyProcessAfter);
    } else {
      $scope.onlyProcessAfterObject = null;
    }
  });

  $scope.$watch('building.onlyProcessUntil', function() {
    if ($scope.building.onlyProcessUntil) {
      $scope.onlyProcessUntilObject = moment.unix($scope.building.onlyProcessUntil);
    } else {
      $scope.onlyProcessUntilObject = null;
    }
  });

  $scope.$watch('regenerationStatus.statesAreRegenerating', function() {
    if ($scope.regenerationStatus.statesAreRegenerating && !$scope.automaticallyRefreshGenerationStatus) {
      // Start automatically refreshing the re-generation status.
      $scope.automaticallyRefreshGenerationStatus = $interval(function() {
        Building.findById({
          id : $scope.building.id
        }, function(refreshedBuilding) {
          $scope.regenerationStatus = {
            statesAreRegenerating : refreshedBuilding.statesAreRegenerating,
            lastRegeneration : refreshedBuilding.lastRegeneration
          };
        });
      }, 10*1000);
    } else if (!$scope.regenerationStatus.statesAreRegenerating && $scope.automaticallyRefreshGenerationStatus) {
      // Cancel the automatic refreshing.
      $interval.cancel($scope.automaticallyRefreshGenerationStatus);
      $scope.automaticallyRefreshGenerationStatus = null;
    }
  });

  // Stop automatically refreshing for state change.
  $scope.$on('$destroy', function() {
    if ($scope.automaticallyRefreshGenerationStatus) {
      $interval.cancel($scope.automaticallyRefreshGenerationStatus);
    }
  });

  // === Data Setup ===
  $scope.bridgesWithSensors = Building.bridges({
    id: $scope.building.id,
    filter : {
      include : ['sensors']
    }
  });

  $scope.regenerationStatus = {
    statesAreRegenerating : $scope.building.statesAreRegenerating,
    lastRegeneration : $scope.building.lastRegeneration
  }

  // === UI Commands ===
  $scope.regenerateStates = function() {
    Building.regenerateState({
      id : $scope.building.id
    }).$promise.then(function() {
      $scope.regenerationStatus.statesAreRegenerating = true;
    });
  };

  $scope.saveProcessingOptions = function() {
    // Update the 'onlyProcessAfter' and 'onlyProcessUntil' values from the moment objects.
    if ($scope.onlyProcessAfterObject) {
      $scope.building.onlyProcessAfter = $scope.onlyProcessAfterObject.unix();
    } else {
      $scope.building.onlyProcessAfter = null;
    }

    if ($scope.onlyProcessUntilObject) {
      $scope.building.onlyProcessUntil = $scope.onlyProcessUntilObject.unix();
    } else {
      $scope.building.onlyProcessUntil = null;
    }

    $scope.saveBuilding();
  };

  $scope.saveBatteryOptions = function() {
    $scope.saveBuilding();
  };

  $scope.saveEnergyFlowOptions = function() {
    $scope.saveBuilding();
  };
});
