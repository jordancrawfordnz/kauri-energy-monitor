'use strict';

/**
 * @ngdoc function
 * @name kauriApp.directive:buildingPeople
 * @description
 * # buildingPeople
 * Allows a user to add or remove people from a building.
 */

angular.module('kauriApp')
  .directive('buildingPeople', function() {
    return {
      restrict: 'A', // to be used via an attribute only.
      scope: {
        building : '=building',
        showError : '&showError',
        showSuccess : '&showSuccess'
      },
      controller: 'BuildingPeopleCtrl',
      templateUrl: 'views/buildingpeople.html'
    };
  });
