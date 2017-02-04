'use strict';

/**
 * @ngdoc function
 * @name offgridmonitoringApp.directive:buildingForm
 * @description
 * # buildingForm
 * Provides a form for core building options. e.g.: the name of the building and graph display parameters.
 */

angular.module('offgridmonitoringApp')
  .directive('buildingForm', function() {
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
      templateUrl: 'views/buildingform.html'
    };
  });
