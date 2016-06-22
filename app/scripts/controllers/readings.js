'use strict';

/**
 * @ngdoc function
 * @name offgridmonitoringApp.controller:ReadingsCtrl
 * @description
 * # ReadingsCtrl
 * Provides a paginated view of readings.
 */
angular.module('offgridmonitoringApp')
  .controller('ReadingsCtrl', function ($scope, $routeParams, Building, Breadcrumb, Breadcrumbs, Reading, SensorTypes) {
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
    $scope.dateTimeFormat = 'D/M/Y LTS';
    $scope.currentPage = 1;
    $scope.sortOrder = 'desc';
    
    $scope.datePickerOptions = {
      icons : {
        next: 'glyphicon glyphicon-arrow-right',
        previous: 'glyphicon glyphicon-arrow-left',
        up: 'glyphicon glyphicon-arrow-up',
        down: 'glyphicon glyphicon-arrow-down'
      },
      format : $scope.dateTimeFormat
    };

    $scope.SensorTypes = SensorTypes;
    
  	$scope.building = Building.findById({id : $routeParams.buildingId});
    // Setup breadcrumbs.
    Breadcrumbs.addPlaceholder('Building', $scope.building.$promise, function(building) {
      return new Breadcrumb(building.name, '/' + $routeParams.buildingId);
    });

    Breadcrumbs.add(new Breadcrumb('Readings', '/' + $routeParams.buildingId + '/bridges', 'See a paginated view of readings for a date range.'));

    // Get bridges for this person.
  	$scope.bridges = Building.bridges({
        id : $routeParams.buildingId,
        filter : {
        	include : ['sensors']
        }
    });

    $scope.bridges.$promise.then(function(bridges) {
      $scope.bridge = bridges[0];
    });

    // Gets the where filter that limits the time period and bridge ID.
    $scope.getWhereFilter = function() {
      if ($scope.from && $scope.from.length > 0) {
        var fromTimestamp = moment($scope.from, $scope.dateTimeFormat).unix();
      }
      if ($scope.until && $scope.until.length > 0) {
        var untilTimestamp = moment($scope.until, $scope.dateTimeFormat).unix();
      }

      var whereFilter = {
        bridgeId : $scope.bridge.id
      };
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

    // Re-counts the number of pages in the search by getting the count of results.
    $scope.recountSearch = function() {
      $scope.bridges.$promise.then(function() {
        Reading.count({
          where : $scope.getWhereFilter()
        }).$promise.then(function(count) {
          $scope.totalReadings = count.count;
          $scope.numberOfPages = Math.ceil($scope.totalReadings / $scope.amountPerPage);
          $scope.currentPage = 1;
        });
      });
    };

    // Refresh the search results.
    $scope.refreshSearch = function() {
      $scope.bridges.$promise.then(function() {
        if (!$scope.bridge) {
          return;
        }
        $scope.readings = Reading.find({
          filter : {
            skip : ($scope.currentPage - 1) * $scope.amountPerPage,
            limit : $scope.amountPerPage,
            order : 'timestamp ' + $scope.sortOrder,
            where : $scope.getWhereFilter()
          }
        });
      });
    };

    $scope.$watch('currentPage', function() {
      // Update the current page text to match the current page.
      $scope.currentPageText = $scope.currentPage.toString();
    });
    $scope.$watchGroup(['currentPageText', 'numberOfPages'], function() {
      // Check the text is valid.
      var currentPage = parseInt($scope.currentPageText);
      $scope.isCurrentPageError = !(!isNaN(currentPage) && currentPage > 0 && currentPage <= $scope.numberOfPages);
      if (!$scope.isCurrentPageError) {
        // If valid, set the currentPage.
        $scope.currentPage = currentPage;
      }
    });

    $scope.$watchGroup(['from', 'until', 'amountPerPage'], $scope.recountSearch);
    $scope.$watchGroup(['currentPage', 'sortOrder', 'from', 'until', 'amountPerPage'], $scope.refreshSearch);

  });
