'use strict';

/**
* @ngdoc function
* @name kauriApp.directive:personDetailsForm
* @description
* # personDetailsForm
* Allows a user to enter the name and email address for a person.
*/

angular.module('kauriApp')
.directive('personDetailsForm', function() {
  return {
    restrict: 'E', // to be used via an element
    controller: ['$scope', function($scope) {
      $scope.$watch('personDetailsForm.$valid', function(validity) {
        $scope.isValid = validity;
      });
    }],
    scope: {
      person : '=person',
      isValid : '=isValid'
    },
    templateUrl: 'views/persondetailsform.html'
  };
});
