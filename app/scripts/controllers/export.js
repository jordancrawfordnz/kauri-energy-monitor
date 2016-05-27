'use strict';

/**
 * @ngdoc function
 * @name offgridmonitoringApp.controller:ExportCtrl
 * @description
 * # ExportCtrl
 * Allows building data to be exported.
 */
angular.module('offgridmonitoringApp')
  .controller('ExportCtrl', function ($interval, $scope, Breadcrumb, Breadcrumbs, $routeParams, Building, Environment, People, LoopBackAuth, $rootScope) {
  	$scope.dateTimeFormat = 'D/M/Y LTS';

    $scope.baseUrl = Environment.baseUrl; // the base token to use in an export URL.
    $scope.authToken = LoopBackAuth.accessTokenId;

    $scope.building = Building.findById({id : $routeParams.buildingId});

    // Setup breadcrumbs.
    Breadcrumbs.addPlaceholder('Building', $scope.building.$promise, function(building) {
      return new Breadcrumb(building.name, '/' + $routeParams.buildingId);
    });
    Breadcrumbs.add(new Breadcrumb('Export', '/' + $routeParams.buildingId + '/export', 'Export data for a building.'));

    $scope.exports = [];

    $scope.refreshPreviousExports = function() {
      // Get the current set of exports for $scope building.
      Building.exports({
        id : $routeParams.buildingId
      }).$promise.then(function(exports) {
        // On successful get, set the exports.
        $scope.exports = exports;
      });
    };

    $scope.refreshPreviousExports(); // do an initial refresh.
    $scope.autoRefreshSeconds = 10;
    $scope.autoRefreshInterval = $interval($scope.refreshPreviousExports, $scope.autoRefreshSeconds*1000); // auto-refresh every autoRefreshSeconds seconds.
    
    // Cancel the interval when leaving the page.
    $rootScope.$on('$routeChangeStart', function() {
      $interval.cancel($scope.autoRefreshInterval);
    });

    $scope.datePickerOptions = {
      icons : {
        next: 'glyphicon glyphicon-arrow-right',
        previous: 'glyphicon glyphicon-arrow-left',
        up: 'glyphicon glyphicon-arrow-up',
        down: 'glyphicon glyphicon-arrow-down'
      },
      locale : 'en-NZ',
      format : $scope.dateTimeFormat
    };

    $scope.datePickerConfig = {
      startView : 'day',
      modelType : 'moment'
    };

    $scope.$watch('date', function(newData) {
      if (newData) {
       $rootScope.currentDate = newData;
      }
    });

    $scope.startExport = function() {
      $scope.hasFailedExportSetup = false;
      
      var exportRequest = {};
      if ($scope.from && $scope.from.length > 0) {
        exportRequest.after = moment($scope.from, $scope.dateTimeFormat).unix();
      }
      if ($scope.until && $scope.until.length > 0) {
        exportRequest.until = moment($scope.until, $scope.dateTimeFormat).unix();
      }
      var exportJob = Building.exports.create({
        id : $routeParams.buildingId
      }, exportRequest);

      exportJob.$promise.then(function(exportJob) {
        $scope.exports.push(exportJob); // add the export job to the list.
      }, function() {
        $scope.hasFailedExportSetup = true;
      });
    };

    $scope.delete = function(exportToDelete) {
      // Do a delete, then remove it from the list of data.
      exportToDelete.$delete().finally(function() {
        $scope.exports.splice($scope.exports.indexOf(exportToDelete), 1);
      });
    };

  });
