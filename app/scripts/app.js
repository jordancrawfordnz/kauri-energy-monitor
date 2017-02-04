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
        controllerAs: 'summary',
        showBreadcrumbs: false
      })
      .when('/:buildingId/configuration', {
        templateUrl: 'views/buildingconfiguration.html',
        controller: 'BuildingConfigurationCtrl'
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
      .when('/:buildingId/future', {
        templateUrl: 'views/future.html',
        controller: 'FutureStateCtrl'
      })
      .when('/:buildingId/patterns', {
        templateUrl: 'views/predictionpatterns.html',
        controller: 'PredictionPatternCtrl'
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
    $rootScope.$on('$routeChangeStart', function(next, current) {
      $rootScope.showBreadcrumbs = current.$$route.showBreadcrumbs !== false;
    });

    $rootScope.batteryDataFilter = {
      amountPerPage : '50',
      sortOrder : 'desc',
      displayEvery : 6*60*60
    };

    $rootScope.displayEveryLevels = [
      {
        name : 'Original'
      },
      {
        name : '30 Minutes',
        period : 30*60
      },
      {
        name : 'Hour',
        period : 60*60
      },
      {
        name : '3 Hours',
        period : 3*60*60
      },
      {
        name : '6 Hours',
        period : 6*60*60
      },
      {
        name : '12 Hours',
        period : 12*60*60
      },
      {
        name : 'Day',
        period : 24*60*60
      },
      {
        name : 'Week',
        period : 7*24*60*60
      }
    ];

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
