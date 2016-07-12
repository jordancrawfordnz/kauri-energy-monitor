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
    'lbServices',
    'environmentConstants',
    'ae-datetimepicker',
    'angularMoment',
    'chart.js'
  ])
  .config(function ($routeProvider, $httpProvider, LoopBackResourceProvider, $locationProvider, Environment) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/buildings.html'
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl',
      })
      .when('/profile', {
        templateUrl: 'views/profile.html',
        controller: 'ProfileCtrl'
      })
      .when('/:buildingId', {
        templateUrl: 'views/buildingsummary.html',
        controller: 'BuildingSummaryCtrl',
        controllerAs: 'summary'
      })
      .when('/:buildingId/configuration', {
        templateUrl: 'views/buildingconfiguration.html',
        controller: 'BuildingConfigCtrl',
        controllerAs: 'buildingConfig'
      })
      .when('/:buildingId/reading', {
        templateUrl: 'views/readings.html',
        controller: 'ReadingsCtrl'
      })
      .when('/:buildingId/states', {
        templateUrl: 'views/states.html',
        controller: 'StatesCtrl'
      })
      .when('/:buildingId/calibrations', {
        templateUrl: 'views/calibrations.html',
        controller: 'CalibrationsCtrl'
      })
      .when('/:buildingId/export', {
        templateUrl: 'views/export.html',
        controller: 'ExportCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });

    // use the HTML5 History API
    $locationProvider.html5Mode(true);

    LoopBackResourceProvider.setUrlBase(Environment.baseUrl);

    // From https://docs.strongloop.com/display/public/LB/AngularJS+JavaScript+SDK
    $httpProvider.interceptors.push(function($q, $location, LoopBackAuth) {
      return {
        responseError: function(rejection) {
          if (rejection.status == 401) {
            // Now clearing the loopback values from client browser for safe logout...
            LoopBackAuth.clearUser();
            LoopBackAuth.clearStorage();
            $location.nextAfterLogin = $location.path();
            $location.path('/login');
          }
          return $q.reject(rejection);
        }
      };
    });
  })
  .run(function($rootScope, LoopBackAuth, $location, People, Breadcrumbs) {
    $rootScope.dateTimeFormat = 'D/M/Y LTS';
    
    $rootScope.logout = function() {
      LoopBackAuth.clearUser();
      LoopBackAuth.clearStorage();
      $location.path('/login');
    };

    $rootScope.people = People;

    $rootScope.editProfile = function() {
      $location.path('/profile');
    };

    var getUserDetails = function() {
      var currentId = People.getCurrentId();
      if (currentId) {
        People.findById({id : currentId}).$promise.then(function(user) {
          $rootScope.user = user;
        });
      }
    };
  
    // Try get the user's details.    
    getUserDetails();
    $rootScope.$on('login', getUserDetails);

    $rootScope.Breadcrumbs = Breadcrumbs;
  });
