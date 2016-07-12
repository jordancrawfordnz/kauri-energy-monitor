'use strict';

/**
 * @ngdoc function
 * @name offgridmonitoringApp.controller:CalibrationsCtrl
 * @description
 * # CalibrationsCtrl
 * Provides a paginated view of recalibrations.
 */
angular.module('offgridmonitoringApp')
  .controller('CalibrationsCtrl', function ($rootScope, $scope, $routeParams, Building, Breadcrumb, Breadcrumbs, Timestamp) {
    /*
      Allows:
        - select a date range to display
        - paginated view of recalibrations
        - define a sort order, most recent first or oldest first.
        
      The page starts at 1 which will map to page 0 in API calls.
    */
    $scope.amountPerPage = '50';
    $scope.debounceTime = 500;
    $scope.currentPage = 1;
    $scope.sortOrder = 'desc';

    $scope.building = Building.findById({id : $routeParams.buildingId});
    $scope.building.$promise.then(function() {
      $scope.recountSearch();
      $scope.refreshSearch();
    });

    // Setup breadcrumbs.
    Breadcrumbs.addPlaceholder('Building', $scope.building.$promise, function(building) {
      return new Breadcrumb(building.name, '/' + $routeParams.buildingId);
    });

    Breadcrumbs.add(new Breadcrumb('Calibration Points', '/' + $routeParams.buildingId + '/recalibrations', 'See a paginated view of battery status recalibrations for a date range.'));

    // Re-counts the number of results in the search when the filters change.
    $scope.recountSearch = function() {
      if (!$scope.building.id) return;
      Building.recalibrations.count({
        id : $scope.building.id,
        where : Timestamp.getRangeWhereFilter($scope.from, $scope.until)
      }).$promise.then(function(count) {
        $scope.totalStates = count.count;
      });
    };
    $scope.$watchGroup(['from', 'until', 'displayEvery'], $scope.recountSearch);

    // Refresh the search results.
    $scope.refreshSearch = function() {
      if (!$scope.building.id) return;
      $scope.recalibrations = Building.recalibrations({
        id : $scope.building.id,
        filter : {
          skip : ($scope.currentPage - 1) * $scope.amountPerPage,
          limit : $scope.amountPerPage,
          order : 'timestamp ' + $scope.sortOrder,
          where : Timestamp.getRangeWhereFilter($scope.from, $scope.until)
        }
      });
    };
    $scope.$watchGroup(['currentPage', 'sortOrder', 'from', 'until', 'amountPerPage', 'displayEvery'], $scope.refreshSearch);

  });
