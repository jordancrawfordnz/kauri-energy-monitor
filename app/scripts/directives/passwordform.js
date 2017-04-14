'use strict';

/**
* @ngdoc function
* @name kauriApp.directive:passwordForm
* @description
* # passwordForm
* Allows a user to enter a password and confirm it, requiring that the passwords match.
*/

angular.module('kauriApp')
.directive('passwordForm', function() {
  return {
    restrict: 'E', // to be used via an element
    controller: ['$scope', function($scope) {
      $scope.$watch([''])
      $scope.$watchGroup(['password1', 'password2'], function() {
        $scope.isValid = $scope.password1 && $scope.password1 === $scope.password2;
        if ($scope.isValid) {
          $scope.password = $scope.password1;
        }
      });
    }],
    scope: {
      password : '=password',
      isValid : '=isValid',
      fieldName : '=fieldName'
    },
    templateUrl: 'views/passwordform.html'
  };
});
