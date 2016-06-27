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
    $scope.amountPerPage = "10";
    $scope.debounceTime = 500;
    $scope.currentPage = 1;
    $scope.sortOrder = 'desc';
    $scope.displayEveryLevels = [
      {
        name : 'Original'
      },
      {
        name : '30 Seconds',
        period : 30
      },
      {
        name : 'Minute',
        period : 60
      },
      {
        name : '10 Minutes',
        period : 10*60
      },
      {
        name : '30 Minutes',
        period : 30*60
      },
      {
        name : 'Hour',
        period : 60*60
      }
    ];
    
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

    // Re-counts the number of results in the search when the filters change.
    $scope.recountSearch = function() {
      $scope.building.$promise.then(function() {
        Bridge.readings.count({
          id : $scope.bridge.id,
          where : Timestamp.getRangeWhereFilter($scope.from, $scope.until, $scope.displayEvery)
        }).$promise.then(function(count) {
          $scope.totalReadings = count.count;
        });
      });
    };
    $scope.$watchGroup(['from', 'until', 'displayEvery'], $scope.recountSearch);

    // Refresh the search results.
    $scope.refreshSearch = function() {
      $scope.building.$promise.then(function() {
        $scope.readings = Bridge.readings({
          id : $scope.bridge.id,
          filter : {
            skip : ($scope.currentPage - 1) * $scope.amountPerPage,
            limit : $scope.amountPerPage,
            order : 'timestamp ' + $scope.sortOrder,
            where : Timestamp.getRangeWhereFilter($scope.from, $scope.until, $scope.displayEvery)
          }
        });
      });
    };
    $scope.$watchGroup(['currentPage', 'sortOrder', 'from', 'until', 'amountPerPage', 'displayEvery'], $scope.refreshSearch);

  });
