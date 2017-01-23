'use strict';

/**
 * @ngdoc function
 * @name offgridmonitoringApp.directive:buildingConfiguration
 * @description
 * # buildingConfiguration
 * Displays options for a new or an existing building.
 */

angular.module('offgridmonitoringApp')
	.directive('buildingConfiguration', function() {
	  return {
	    restrict: 'E', // to be used via an element only.
	    controller: 'BuildingConfigCtrl',
	    scope: {
	    	building : '=building'
	    },
	    templateUrl: 'views/buildingconfiguration.html'
	  };
	});
