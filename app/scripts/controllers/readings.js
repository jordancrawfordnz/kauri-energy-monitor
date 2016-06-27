'use strict';

/**
 * @ngdoc function
 * @name offgridmonitoringApp.controller:ReadingsCtrl
 * @description
 * # ReadingsCtrl
 * Provides a paginated view of readings.
 */
angular.module('offgridmonitoringApp')
  .controller('ReadingsCtrl', function ($rootScope, $scope, $routeParams, Building, Bridge, Breadcrumb, Breadcrumbs, Reading, SensorTypes) {
    /*
      Allows:
        - select a date range to display
        - paginated readings
        - define a sort order, most recent first or oldest first.
          - TODO: support skipping every n readings

      The page starts at 1 which will map to page 0 in API calls.
    */
    $scope.amountPerPage = "10";
    $scope.debounceTime = 500;
    $scope.currentPage = 1;
    $scope.sortOrder = 'desc';
    
    $scope.SensorTypes = SensorTypes;
    
  	$scope.building = Building.findById({
      id : $routeParams.buildingId,
      filter : {
        include : {'bridges' : 'sensors'} 
      }
    });
    $scope.building.$promise.then(function(building) {
      $scope.bridge = building.bridges[0];
    });

    // Setup breadcrumbs.
    Breadcrumbs.addPlaceholder('Building', $scope.building.$promise, function(building) {
      return new Breadcrumb(building.name, '/' + $routeParams.buildingId);
    });

    Breadcrumbs.add(new Breadcrumb('Readings', '/' + $routeParams.buildingId + '/bridges', 'See a paginated view of readings for a date range.'));

    // Gets the where filter that limits the time period and bridge ID.
    $scope.getWhereFilter = function() {
      if ($scope.from && $scope.from.length > 0) {
        var fromTimestamp = moment($scope.from, $rootScope.dateTimeFormat).unix();
      }
      if ($scope.until && $scope.until.length > 0) {
        var untilTimestamp = moment($scope.until, $rootScope.dateTimeFormat).unix();
      }

      var whereFilter = {};
      if (untilTimestamp || fromTimestamp) {
        whereFilter.timestamp = {};
        if (untilTimestamp && fromTimestamp) {
          whereFilter.timestamp.between = [fromTimestamp, untilTimestamp];
        } else {
          if (untilTimestamp) {
            whereFilter.timestamp.lt = untilTimestamp;
          }
          if (fromTimestamp) {
            whereFilter.timestamp.gt = fromTimestamp;
          }
        }
      }
      
      return whereFilter;
    };

    // Re-counts the number of results in the search when the filters change.
    $scope.recountSearch = function() {
      $scope.building.$promise.then(function() {
        Bridge.readings.count({
          id : $scope.bridge.id,
          where : $scope.getWhereFilter()
        }).$promise.then(function(count) {
          $scope.totalReadings = count.count;
        });
      });
    };
    $scope.$watchGroup(['from', 'until'], $scope.recountSearch);

    // Refresh the search results.
    $scope.refreshSearch = function() {
      $scope.building.$promise.then(function() {
        $scope.readings = Bridge.readings({
          id : $scope.bridge.id,
          filter : {
            skip : ($scope.currentPage - 1) * $scope.amountPerPage,
            limit : $scope.amountPerPage,
            order : 'timestamp ' + $scope.sortOrder,
            where : $scope.getWhereFilter()
          }
        });
      });
    };
    $scope.$watchGroup(['currentPage', 'sortOrder', 'from', 'until', 'amountPerPage'], $scope.refreshSearch);

  });
