'use strict';

/**
 * @ngdoc function
 * @name offgridmonitoringApp.controller:ReadingsCtrl
 * @description
 * # ReadingsCtrl
 * Provides a paginated view of readings.
 */
angular.module('offgridmonitoringApp')
  .controller('ReadingsCtrl', function ($rootScope, $scope, $routeParams, Building, Bridge, Breadcrumb, Breadcrumbs, Reading, SensorTypes, Timestamp) {
    /*
      Allows:
        - select a date range to display
        - paginated readings
        - define a sort order, most recent first or oldest first.
        - define the time period between readings.

      The page starts at 1 which will map to page 0 in API calls.
    */
    $scope.filter = $rootScope.batteryDataFilter;
    $scope.debounceTime = 500;
    $scope.currentPage = 1;
    $scope.displayEveryLevels = $rootScope.displayEveryLevels;

    $scope.SensorTypes = SensorTypes;

  	$scope.building = Building.findById({
      id : $routeParams.buildingId,
      filter : {
        include : {'bridges' : 'sensors'}
      }
    });
    $scope.building.$promise.then(function(building) {
      $scope.bridge = building.bridges[0];
        // TODO: Multi bridge support!
      $scope.refresh();

      if ($scope.bridge) {
        Bridge.readings.count({
          id : $scope.bridge.id
        }).$promise.then(function(count) {
          $scope.allReadingsCount = count.count;
        });
      } else {
        $scope.allReadingsCount = 0;
      }
    });

    // Setup breadcrumbs.
    Breadcrumbs.addPlaceholder('Building', $scope.building.$promise, function(building) {
      return new Breadcrumb(building.name, '/' + $routeParams.buildingId);
    });

    Breadcrumbs.add(new Breadcrumb('Sensor Readings', '/' + $routeParams.buildingId + '/bridges', 'See a paginated view of readings for a date range.'));

    // Re-counts the number of results in the search when the filters change.
    $scope.recountSearch = function() {
      if (!$scope.building.id) return;

      if ($scope.bridge) {
        Bridge.readings.count({
          id : $scope.bridge.id,
          where : Timestamp.getRangeWhereFilter($scope.filter.from, $scope.filter.until, $scope.filter.displayEvery)
        }).$promise.then(function(count) {
          $scope.totalReadings = count.count;
        });
      }
    };
    $scope.$watchGroup(['filter.from', 'filter.until', 'filter.displayEvery'], $scope.recountSearch);

    // Refresh the search results.
    $scope.refreshSearch = function() {
      if (!$scope.building.id) return;

      if ($scope.bridge) {
        $scope.readings = Bridge.readings({
          id : $scope.bridge.id,
          filter : {
            skip : ($scope.currentPage - 1) * $scope.filter.amountPerPage,
            limit : $scope.filter.amountPerPage,
            order : 'timestamp ' + $scope.filter.sortOrder,
            where : Timestamp.getRangeWhereFilter($scope.filter.from, $scope.filter.until, $scope.filter.displayEvery)
          }
        });
      }
    };

    $scope.$watchGroup(['currentPage', 'filter.sortOrder', 'filter.from', 'filter.until', 'filter.amountPerPage', 'filter.displayEvery'], $scope.refreshSearch);

    $scope.refresh = function() {
      $scope.refreshSearch();
      $scope.recountSearch();
    };
  });
