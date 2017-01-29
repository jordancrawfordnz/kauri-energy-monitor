'use strict';

/**
 * @ngdoc function
 * @name offgridmonitoringApp.controller:BuildingsCtrl
 * @description
 * # BuildingsCtrl
 * Displays buildings.
 */
angular.module('offgridmonitoringApp')
  .controller('BuildingsCtrl', function (Breadcrumb, Breadcrumbs, People, Building, $timeout, $rootScope) {
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

    this.setInitialNewBuilding = function() {
      this.newBuilding = {
        standardDailyEnergyAxis: 10000,
        standardPowerAxis: 1500
      };
    };

    this.onBuildingChange = function() {
      this.loadBuildings();
      $rootScope.$broadcast('refreshBuildings');
    };

    this.createNewBuilding = function() {
      // Close the modal.
      $("#createBuildingModal").modal('toggle');

      var savedNewBuilding = Building.create(this.newBuilding);
      savedNewBuilding.$promise.then(function() {
        this.buildingCreateError = false;
        this.buildingCreateSuccess = true;

        $timeout(function() {
          this.buildingCreateSuccess = false;
        }.bind(this), 5*1000);

        this.setInitialNewBuilding();
        this.onBuildingChange();
      }.bind(this), function() {
        // Display error message.
        this.buildingCreateError = true;
        this.buildingCreateSuccess = false;
      }.bind(this));
    };

    this.loadBuildings();
    this.setInitialNewBuilding();
  });
