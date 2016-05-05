'use strict';

/**
 * @ngdoc function
 * @name offgridmonitoringApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Allows a user to login.
 */
angular.module('offgridmonitoringApp')
  .controller('LoginCtrl', function ($scope, People, $rootScope, $location) {
    if (People.isAuthenticated()) {
      $location.path('/');
    }

    $scope.login = function() {
    	People.login({
        email : this.emailAddress,
        password : this.password
      }, function(auth) {
        var next;
        if ($location.nextAfterLogin === '/login') {
          next = '/';
        } else {
          next = $location.nextAfterLogin || '/';
        }

        $location.nextAfterLogin = null;
        $location.path(next);

        $rootScope.$broadcast('login', auth);
      }, function(err) {
        $scope.hasFailedLogin = true;
      });
    };

    $scope.getDetails = function() {
      console.log(People.getCurrentId());
      console.log(People.isAuthenticated());
    };
  });
