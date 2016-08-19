'use strict';

/**
 * @ngdoc function
 * @name offgridmonitoringApp.controller:StatesCtrl
 * @description
 * # StatesCtrl
 * Provides a paginated view of states and a graph of state over time.
 */
angular.module('offgridmonitoringApp')
  .controller('StatesCtrl', function ($rootScope, $scope, $routeParams, Building, Breadcrumb, Breadcrumbs, State, Timestamp, ChartColours) {
    /*
      Allows:
        - select a date range to display
        - paginated view of states
        - define a sort order, most recent first or oldest first.
        - define the time period between states.
        - graph of states

      The page starts at 1 which will map to page 0 in API calls.
    */
    $scope.detailTabs = {
      'socgraph' : 'State of Charge',
      'energysourcegraph' : 'Daily Energy Sources',
      'totalenergy' : 'Daily Total Energy'
    };
    $scope.activeDetailTab = 'socgraph';

    $scope.amountPerPage = '50';
    $scope.debounceTime = 500;
    $scope.currentPage = 1;
    $scope.sortOrder = 'desc';
    $scope.displayEvery = 6*60*60;
    $scope.displayEveryLevels = [
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

    $scope.building = Building.findById({
      id : $routeParams.buildingId,
      filter : {
        include : 'energySources'
      }
    });
    // Setup breadcrumbs.
    Breadcrumbs.addPlaceholder('Building', $scope.building.$promise, function(building) {
      return new Breadcrumb(building.name, '/' + $routeParams.buildingId);
    });

    $scope.energySources = {};
    $scope.building.$promise.then(function(building) {
      $scope.energySources.charger = building.chargerEnergySourceName;
      $scope.energySources.other = building.otherEnergySourceName;
      angular.forEach(building.energySources, function(energySource) {
        $scope.energySources[energySource.id] = energySource.name;
      });
      // Initialise the count and the search.
      $scope.recountSearch();
      $scope.refreshSearch();
    });

    Breadcrumbs.add(new Breadcrumb('Battery State', '/' + $routeParams.buildingId + '/states', 'See a paginated view of states for a date range.'));

    // Re-counts the number of results in the search when the filters change.
    $scope.recountSearch = function() {
      if (!$scope.building.id) return;
      Building.states.count({
        id : $scope.building.id,
        where : Timestamp.getRangeWhereFilter($scope.from, $scope.until, $scope.displayEvery)
      }).$promise.then(function(count) {
        $scope.totalStates = count.count;
      });
    };
    $scope.$watchGroup(['from', 'until', 'displayEvery'], $scope.recountSearch);

    // Refresh the search results.
    $scope.refreshSearch = function() {
      if (!$scope.building.id) return;
      
      Building.states({
        id : $scope.building.id,
        filter : {
          skip : ($scope.currentPage - 1) * $scope.amountPerPage,
          limit : $scope.amountPerPage,
          order : 'timestamp ' + $scope.sortOrder,
          where : Timestamp.getRangeWhereFilter($scope.from, $scope.until, $scope.displayEvery)
        }
      }).$promise.then(function(states) {
        $scope.states = states;
      });
    };
    $scope.$watchGroup(['currentPage', 'sortOrder', 'from', 'until', 'amountPerPage', 'displayEvery'], $scope.refreshSearch);

  });
