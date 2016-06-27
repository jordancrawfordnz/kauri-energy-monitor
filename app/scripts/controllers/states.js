'use strict';

/**
 * @ngdoc function
 * @name offgridmonitoringApp.controller:StatesCtrl
 * @description
 * # StatesCtrl
 * Provides a paginated view of states and a graph of state over time.
 */
angular.module('offgridmonitoringApp')
  .controller('StatesCtrl', function ($rootScope, $scope, $routeParams, Building, Breadcrumb, Breadcrumbs, State, Timestamp) {
    /*
      Allows:
        - select a date range to display
        - paginated view of states
        - define a sort order, most recent first or oldest first.
          - TODO: support skipping every n readings
        - graph of states

      The page starts at 1 which will map to page 0 in API calls.
    */
    $scope.amountPerPage = "100";
    $scope.debounceTime = 500;
    $scope.currentPage = 1;
    $scope.sortOrder = 'asc';
    
    $scope.building = Building.findById({id : $routeParams.buildingId});
    // Setup breadcrumbs.
    Breadcrumbs.addPlaceholder('Building', $scope.building.$promise, function(building) {
      return new Breadcrumb(building.name, '/' + $routeParams.buildingId);
    });

    Breadcrumbs.add(new Breadcrumb('States', '/' + $routeParams.buildingId + '/states', 'See a paginated view of states for a date range.'));

    // Re-counts the number of results in the search when the filters change.
    $scope.recountSearch = function() {
      $scope.building.$promise.then(function() {
        Building.states.count({
          id : $scope.building.id,
          where : Timestamp.getRangeWhereFilter($scope.from, $scope.until)
        }).$promise.then(function(count) {
          $scope.totalStates = count.count;
        });
      });
    };
    $scope.$watchGroup(['from', 'until'], $scope.recountSearch);

    // Refresh the search results.
    $scope.refreshSearch = function() {
      $scope.building.$promise.then(function() {
        $scope.states = Building.states({
          id : $scope.building.id,
          filter : {
            skip : ($scope.currentPage - 1) * $scope.amountPerPage,
            limit : $scope.amountPerPage,
            order : 'timestamp ' + $scope.sortOrder,
            where : Timestamp.getRangeWhereFilter($scope.from, $scope.until)
          }
        });
      });
    };
    $scope.$watchGroup(['currentPage', 'sortOrder', 'from', 'until', 'amountPerPage'], $scope.refreshSearch);

  });
