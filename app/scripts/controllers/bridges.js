'use strict';

/**
 * @ngdoc function
 * @name offgridmonitoringApp.controller:BridgesCtrl
 * @description
 * # BridgesCtrl
 * Displays bridges.
 */
angular.module('offgridmonitoringApp')
  .controller('BridgesCtrl', function (Breadcrumb, Breadcrumbs, $routeParams, Building, SensorTypes) {
  	this.sensorTypes = SensorTypes;
    
    this.building = Building.findById({id : $routeParams.buildingId});
    // Setup breadcrumbs.
    Breadcrumbs.addPlaceholder('Building', this.building.$promise, function(building) {
      return new Breadcrumb(building.name, '/' + $routeParams.buildingId);
    });

    Breadcrumbs.add(new Breadcrumb('Bridges', '/' + $routeParams.buildingId + '/bridges', 'A bridge is a computer that automatically submits data from the building using its connected sensors.'));

    // Get bridges for this person.
  	this.bridges = Building.bridges({
        id : $routeParams.buildingId,
        filter : {
        	include : ['sensors']
        }
    });

  });
