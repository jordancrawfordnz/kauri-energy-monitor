'use strict';

/**
 * @ngdoc function
 * @name offgridmonitoringApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Allows a user to login.
 */
angular.module('offgridmonitoringApp')
  .controller('LoginCtrl', function ($scope, People, Authentication) {
    $scope.login = function() {
    	 Authentication.login(this.emailAddress, this.password).then(function(auth) {
        console.log(auth);
       }, function(err) {
        // TODO: better error handling.
        console.log('err');
        console.log(err);
       });

    };
  });
