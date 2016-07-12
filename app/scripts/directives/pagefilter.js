'use strict';

/**
 * @ngdoc function
 * @name offgridmonitoringApp.directive:pageFilter
 * @description
 * # pageFilter
 * Allows a user to define a daterange, sort order, page and amount per page.
 */

angular.module('offgridmonitoringApp')
	.directive('pageFilter', function() {
	  return {
	    restrict: 'E', // to be used via an element
	    controller: ['$rootScope', '$scope', function($rootScope, $scope) {
	    	if ($scope.from === undefined) {
	    		$scope.from = null;
	    	}
	    	if ($scope.until === undefined) {
	    		$scope.until = null;
	    	}

	    	$scope.datePickerOptions = {
		      icons : {
		        next: 'glyphicon glyphicon-arrow-right',
		        previous: 'glyphicon glyphicon-arrow-left',
		        up: 'glyphicon glyphicon-arrow-up',
		        down: 'glyphicon glyphicon-arrow-down'
		      },
		      format : $rootScope.dateTimeFormat
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
		    	$scope.numberOfPages = Math.ceil($scope.numberOfResults / $scope.amountPerPage);
	          	$scope.currentPage = 1;
		    };
			$scope.$watchGroup(['numberOfResults', 'amountPerPage', 'displayEvery'], $scope.resetPage);
	    }],
	    scope: {
	    	sortOrder : '=sortOrder',
	    	numberOfResults : '=numberOfResults',
	    	currentPage : '=currentPage',
	    	amountPerPage : '=amountPerPage',
	    	from : '=from',
	    	until : '=until',
	    	displayEveryLevels : '=displayEveryLevels',
	    	displayEvery : '=displayEvery'
	    },
	    templateUrl: 'views/pagefilter.html'
	  };
	});
