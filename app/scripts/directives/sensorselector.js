'use strict';

/**
 * @ngdoc function
 * @name offgridmonitoringApp.directive:sensorSelector
 * @description
 * # sensorSelector
 * Allows a user to select a sensor from a dropdown list.
 */

angular.module('offgridmonitoringApp')
	.directive('sensorSelector', function() {
	  return {
	    restrict: 'A', // to be used via attributes
	    controller: function($scope) {
	    	// Fill in the sensors once the building has loaded.
	    	$scope.building.$promise.then(function() {
	    		$scope.sensors = [];
		    	
		    	// Get all sensors.
		    	angular.forEach($scope.building.bridges, function(bridge) {
		    		angular.forEach(bridge.sensors, function(sensor) {
		    			$scope.sensors.push({
		    				value : sensor.id,
		    				text : sensor.name
		    			});
		    		});
		    	});
	    	});
	    },
	    scope: {
	    	building : '=building', // building should include bridges and sensors.
	    	model : '=model'
	    },
	    templateUrl: 'views/sensorselector.html'
	  };
	});
