'use strict';

/**
 * @ngdoc function
 * @name offgridmonitoringApp.controller:ProcessingConfigCtrl
 * @description
 * # ProcessingConfigCtrl
 * A tab for the building configuration page to allow users to set data processing options.
 */
angular.module('offgridmonitoringApp').controller('ProcessingConfigCtrl', function ($rootScope, $scope, Building, SensorTypes) {
  $scope.datePickerOptions = {
    icons : {
      next: 'glyphicon glyphicon-arrow-right',
      previous: 'glyphicon glyphicon-arrow-left',
      up: 'glyphicon glyphicon-arrow-up',
      down: 'glyphicon glyphicon-arrow-down'
    },
    format : $rootScope.dateTimeFormat,
    timeZone : 'Pacific/Auckland'
  };

  $scope.sensorTypes = SensorTypes;

  $scope.onlyProcessAfterObject = null;
  $scope.onlyProcessUntilObject = null;

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
});
