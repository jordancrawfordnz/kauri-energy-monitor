'use strict';

/**
 * @ngdoc overview
 * @name offgridmonitoringApp
 * @description
 * # offgridmonitoringApp
 *
 * Main module of the application.
 */
angular
  .module('offgridmonitoringApp', [
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'lbServices'
  ])
  .config(function ($routeProvider, LoopBackResourceProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl',
      })
      .otherwise({
        redirectTo: '/'
      });

      // TODO: Get grunt to provide config variables.
      LoopBackResourceProvider.setUrlBase('http://localhost:3000/api');
  });
