'use strict';

/**
 * @ngdoc function
 * @name offgridmonitoringApp.directive:hourlyPredictionData
 * @description
 * # hourlyPredictionData
 * Displays the hourly average prediction.
 */

angular.module('offgridmonitoringApp')
	.directive('hourlyPredictionData', function() {
	  return {
	    restrict: 'A', // to be used via an attribute
	    scope: {
	    	predictionPattern : '=predictionPattern'
	    },
	    templateUrl: 'views/hourlypredictiondata.html'
	  };
	});