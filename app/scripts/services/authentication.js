'use strict';

/**
 * @ngdoc function
 * @name offgridmonitoringApp.controller:Authentication
 * @description
 * # Authentication
 * Manages logging in and logging out for people.
 */
angular.module('offgridmonitoringApp')
  .factory('Authentication', function ($q, People) {
  	var Authentication = {};

  	// Returns a promise.
  	Authentication.login = function(email, password) {
  		Authentication.currentLoginPromise = People.login({
    		email : email,
    		password : password
    	}).$promise;

    	Authentication.currentLoginPromise.then(function(auth) {
    		var token = auth.id;
    		var personId = auth.userId;
    		console.log(token);
    		console.log(personId);

        	// TODO: Store login details in a cookie using a login service.
    	}, function() {
    		Authentication.currentLoginPromise = null; // clear the login promise, it didn't work!
    	});

    	return Authentication.currentLoginPromise;
  	};

  	// Logs the user out immediately.
  	Authentication.logout = function() {
  		// TODO: clear cookie
  	};

  	// Returns a promise for the current user's details or will return undefined if no user logged in.
  	Authentication.getCurrentUser = function() {
  		return Authentication.currentLoginPromise;
  	};

  	return Authentication;
});