'use strict';

/**
 * @ngdoc function
 * @name offgridmonitoringApp.controller:BuildingsCtrl
 * @description
 * # BuildingsCtrl
 * Displays buildings.
 */
angular.module('offgridmonitoringApp')
  .controller('BuildingsCtrl', function (Breadcrumb, Breadcrumbs, People) {
  	console.log('BuildingCtrl');

  	// Get buildings for this person.
  	this.buildings = People.buildings({
        id : People.getCurrentId(),
        filter : {
        	include : ['people']
        }
    });

  	var buildings = new Breadcrumb('Buildings', '/');
  	Breadcrumbs.add(buildings);

  	var buildings2 = new Breadcrumb('Second entry', '/', 'desc');
  	Breadcrumbs.add(buildings2);
  });
