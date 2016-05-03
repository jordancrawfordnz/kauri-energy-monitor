'use strict';

/**
 * @ngdoc function
 * @name offgridmonitoringApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Allows a user to login.
 */
angular.module('offgridmonitoringApp')
  .controller('LoginCtrl', function ($scope, People, $location) {
    $scope.login = function() {
    	People.login({
        email : this.emailAddress,
        password : this.password
      }, function(auth) {
        console.log(auth);

        // From https://docs.strongloop.com/display/public/LB/AngularJS+JavaScript+SDK
        var next = $location.nextAfterLogin || '/';
        $location.nextAfterLogin = null;
        $location.path(next);
      });
    };

    $scope.getDetails = function() {
      console.log(People.getCurrentId());
      console.log(People.isAuthenticated());
    };
  });
