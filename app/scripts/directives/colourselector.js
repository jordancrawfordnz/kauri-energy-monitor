'use strict';

/**
 * @ngdoc function
 * @name offgridmonitoringApp.directive:colourSelector
 * @description
 * # colourSelector
 * Allows a user to select a chart colour from a dropdown list.
 */

angular.module('offgridmonitoringApp')
	.directive('colourSelector', function() {
	  return {
	    restrict: 'A', // to be used via attributes
	    controller: function($scope, ChartColours) {
	    	$scope.options = [];
	    	angular.forEach(ChartColours.colours, function(colourOption, key) {
	    		$scope.options.push({
	    			value : key,
	    			text : colourOption.name
	    		});
	    	});
	    },
	    scope: {
	    	model : '=model'
	    },
	    templateUrl: 'views/selectordropdown.html'
	  };
	});
