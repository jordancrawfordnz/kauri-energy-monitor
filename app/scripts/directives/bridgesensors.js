'use strict';

/**
 * @ngdoc function
 * @name offgridmonitoringApp.directive:bridgeSensors
 * @description
 * # bridgeSensors
 * The interface to view and edit a bridges sensors.
 */

angular.module('offgridmonitoringApp')
  .directive('bridgeSensors', function() {
    return {
      restrict: 'E', // to be used via an element only.
      scope: {
        bridge : '=bridge',
        showError : '&showError',
        showSuccess : '&showSuccess'
      },
      controller: 'BridgeSensorsCtrl',
      templateUrl: 'views/bridgesensors.html'
    };
  });
