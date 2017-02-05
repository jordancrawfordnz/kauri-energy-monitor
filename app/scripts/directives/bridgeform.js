'use strict';

/**
 * @ngdoc function
 * @name offgridmonitoringApp.directive:bridgeForm
 * @description
 * # bridgeForm
 * Provides a form for core bridge options. e.g.: the name of the bridge.
 */

angular.module('offgridmonitoringApp')
  .directive('bridgeForm', function() {
    return {
      restrict: 'E', // to be used via an element only.
      scope: {
        bridge : '=bridge',
        isValid : '=isValid'
      },
      controller: ['$scope', function($scope) {
        $scope.$watch('editBridgeForm.$valid', function(validity) {
          $scope.isValid = validity;
        });
      }],
      templateUrl: 'views/bridgeform.html'
    };
  });
