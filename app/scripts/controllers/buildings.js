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
    Breadcrumbs.add(new Breadcrumb('Buildings', '/', 'Manage your existing buildings or add a new building.'));

    this.loadBuildings = function() {
      // Get buildings for this person.
      this.buildings = People.buildings({
        id : People.getCurrentId(),
        filter : {
          include : ['people']
        }
      });
    };

    this.newBuildingCreated = function() {
      this.loadBuildings();
    };

    this.loadBuildings();
  });
