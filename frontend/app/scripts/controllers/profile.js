'use strict';

/**
 * @ngdoc function
 * @name kauriApp.controller:ProfileCtrl
 * @description
 * # ProfileCtrl
 * Allows a user to change their profile.
 */
angular.module('kauriApp')
  .controller('ProfileCtrl', function (Breadcrumb, Breadcrumbs, People, $http, $scope, $rootScope, $timeout, Environment) {
    Breadcrumbs.add(new Breadcrumb('Edit Profile', 'profile', 'Change your email address, password or name.'));

    // TODO: The backend should provide verification for email address changes and require the existing password to confirm password changes.

    // Get the user's current details.
    $scope.user = People.findById({id : People.getCurrentId()});

    // Save's a user's details to the server.
    $scope.saveUserDetails = function() {
      // Had to do a manual $http put because the Loopback logic only seems to work on the put method with the ID as a param.
      $http.put(Environment.baseUrl + '/people/' + $scope.user.id, $scope.user).then(function(user) {
        $rootScope.user = user.data;
        $scope.hasSaveFailed = false;
        $scope.hasSaveSucceeded = true;
        // Automatically expire success message.
        $timeout(function() {
          $scope.hasSaveSucceeded = false;
        }, 5000);
      }, function() {
        $scope.hasSaveFailed = true;
        $scope.hasSaveSucceeded = false;
      });
    };

    // Change a user's password.
    $scope.changePassword = function() {
      // Had to do a manual $http put because the Loopback logic only seems to work on the put method with the ID as a param.
      $http.put(Environment.baseUrl + '/people/' + $scope.user.id, {
        password : $scope.password
      }).then(function(user) {
        $scope.hasSavePasswordFailed = false;
        $scope.hasSavePasswordSucceeded = true;
        // Automatically expire success message.
        $timeout(function() {
          $scope.hasSavePasswordSucceeded = false;
        }, 5000);
      }, function() {
        $scope.hasSavePasswordFailed = true;
        $scope.hasSavePasswordSucceeded = false;
      });
    };

  });
