'use strict';

/**
 * @ngdoc function
 * @name offgridmonitoringApp.directive:bridge
 * @description
 * # bridge
 * The interface to view a single bridge and edit it's sensors.
 */

angular.module('offgridmonitoringApp')
  .directive('bridge', function() {
    return {
      restrict: 'E', // to be used via an element only.
      scope: {
        bridge : '=',
        showError : '&showError',
        showSuccess : '&showSuccess'
      },
      controller: 'BridgeCtrl',
      templateUrl: 'views/bridge.html'
    };
  });
