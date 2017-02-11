'use strict';

/**
* @ngdoc function
* @name offgridmonitoringApp.directive:personDetailsForm
* @description
* # personDetailsForm
* Allows a user to enter the name and email address for a person.
*/

angular.module('offgridmonitoringApp')
.directive('personDetailsForm', function() {
  return {
    restrict: 'E', // to be used via an element
    controller: ['$scope', function($scope) {
      $scope.$watch('personDetailsForm.$valid', function(validity) {
        $scope.isValid = validity;
      });
    }],
    scope: {
      user : '=user',
      isValid : '=isValid'
    },
    templateUrl: 'views/persondetailsform.html'
  };
});
