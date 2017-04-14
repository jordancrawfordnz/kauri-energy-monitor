'use strict';

/**
 * @ngdoc function
 * @name kauriApp.directive:hourlyPredictionData
 * @description
 * # hourlyPredictionData
 * Displays the hourly average prediction.
 */

angular.module('kauriApp')
	.directive('hourlyPredictionData', function() {
	  return {
	    restrict: 'A', // to be used via an attribute
	    scope: {
	    	predictionPattern : '=predictionPattern'
	    },
	    templateUrl: 'views/hourlypredictiondata.html'
	  };
	});