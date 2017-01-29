'use strict';

/**
 * @ngdoc function
 * @name offgridmonitoringApp.directive:buildingConfiguration
 * @description
 * # buildingConfiguration
 * Displays options for a new or an existing building.
 */

angular.module('offgridmonitoringApp')
  .directive('buildingConfiguration', function() {
    return {
      restrict: 'E', // to be used via an element only.
      scope: {
        building : '=building',
        isValid : '=isValid'
      },
      controller: ['$scope', function($scope) {
        $scope.$watch('editBuildingForm.$valid', function(validity) {
          $scope.isValid = validity;
        });
      }],
      templateUrl: 'views/buildingconfiguration.html'
    };
  });
