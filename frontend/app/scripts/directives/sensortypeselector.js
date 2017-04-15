'use strict';

/**
 * @ngdoc function
 * @name kauriApp.directive:sensorTypesSelector
 * @description
 * # sensorTypesSelector
 * Allows a user to select a sensor type from a dropdown list.
 */

angular.module('kauriApp')
  .directive('sensorTypesSelector', function() {
    return {
      restrict: 'A', // to be used via attributes
      controller: ['SensorTypes', '$scope', function(SensorTypes, $scope) {
        $scope.options = [];

        angular.forEach(SensorTypes, function(sensorTypeValue, sensorTypeKey) {
          $scope.options.push({
            value: sensorTypeKey,
            text : sensorTypeValue.electricity + " " + sensorTypeValue.type
          });
        });
      }],
      scope: {
        model : '=model'
      },
      templateUrl: 'views/selectordropdown.html'
    };
  });
