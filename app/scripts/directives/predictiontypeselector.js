'use strict';

/**
 * @ngdoc function
 * @name offgridmonitoringApp.directive:predictionTypeSelector
 * @description
 * # predictionTypeSelector
 * Allows a user to select a prediction type from a dropdown list.
 */

angular.module('offgridmonitoringApp')
	.directive('predictionTypeSelector', function() {
	  return {
	    restrict: 'A', // to be used via attributes
	    controller: function($scope, ChartColours) {
	    	$scope.options = [
	    	{
	    		value : 'none',
	    		text : 'None (assume always providing no charge)',
	    	},
	    	{
	    		value : 'daily',
	    		text : 'Daily cycle (moving average)'
	    	},
	    	{
	    		value : 'hourly',
	    		text : 'Hourly cycle (exponential average)'
	    	}];
	    },
	    scope: {
	    	model : '=model'
	    },
	    templateUrl: 'views/selectordropdown.html'
	  };
	});
