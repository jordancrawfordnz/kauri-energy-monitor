'use strict';

/**
* @ngdoc function
* @name kauriApp.directive:pageFilter
* @description
* # pageFilter
* Allows a user to define a daterange, sort order, page and amount per page.
*/

angular.module('kauriApp')
.directive('pageFilter', function() {
  return {
    restrict: 'E', // to be used via an element
    controller: ['$rootScope', '$scope', function($rootScope, $scope) {
      if ($scope.filter.from === undefined) {
        $scope.filter.from = null;
      }
      if ($scope.filter.until === undefined) {
        $scope.filter.until = null;
      }

      $scope.datePickerOptions = {
        icons : {
          next: 'glyphicon glyphicon-arrow-right',
          previous: 'glyphicon glyphicon-arrow-left',
          up: 'glyphicon glyphicon-arrow-up',
          down: 'glyphicon glyphicon-arrow-down'
        },
        format : $rootScope.dateTimeFormat,
        timeZone : 'Pacific/Auckland'
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

      // Recalculate the number of pages and reset the current page.
      $scope.resetPage = function() {
        $scope.numberOfPages = Math.ceil($scope.numberOfResults / $scope.filter.amountPerPage);
        if ($scope.numberOfPages === 0) {
          $scope.numberOfPages = 1;
        }
        $scope.currentPage = 1;
      };
      $scope.$watchGroup(['numberOfResults', 'filter.amountPerPage', 'filter.displayEvery'], $scope.resetPage);
    }],
    scope: {
      filter : '=filter',
      numberOfResults : '=numberOfResults',
      currentPage : '=currentPage',
      displayEveryLevels : '=displayEveryLevels',
      refresh : '&refresh'
    },
    templateUrl: 'views/pagefilter.html'
  };
});
