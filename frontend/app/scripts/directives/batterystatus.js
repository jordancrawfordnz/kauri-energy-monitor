'use strict';

/**
 * @ngdoc function
 * @name kauriApp.directive:batteryStatus
 * @description
 * # batteryStatus
 * Shows the battery status.
 */

angular.module('kauriApp')
  .directive('batteryStatus', function() {
    return {
      restrict: 'A', // to be used via an attribute only.
      scope: {
        batteryLevel : '=batteryLevel',
        state : '=state'
      },
      controller: ['$scope', '$rootScope', 'FutureStateHelper', function($scope, $rootScope, FutureStateHelper) {
        $scope.predictionEvents = FutureStateHelper.predictionEvents;

        $scope.dateTimeFormat = $rootScope.dateTimeFormat;

        $scope.$watch('state', function(state) {
          if (state.currentChargeLevel) {
            $scope.chargeLevel = state.currentChargeLevel / state.batteryCapacity;

            if ($scope.chargeLevel > 1) {
              $scope.chargeLevel = 1;
            } else if ($scope.chargeLevel < 0) {
              $scope.chargeLevel = 0;
            }
          }
        });

        $scope.batteryDiagramHeight = 200;

        // Gets the height for the battery level indicator.
        $scope.getBatteryLevelHeight = function() {
          var level = $scope.chargeLevel * $scope.batteryDiagramHeight;
          if (level > $scope.batteryDiagramHeight) {
            return $scope.batteryDiagramHeight;
          }
          if (level < 0) {
            return 0;
          }

          return level;
        };
      }],
      templateUrl: 'views/batterystatus.html'
    };
  });
