'use strict';

/**
 * @ngdoc function
 * @name kauriApp.controller:BuildingsCtrl
 * @description
 * # BuildingsCtrl
 * Displays buildings.
 */
angular.module('kauriApp')
  .controller('BuildingsCtrl', function ($scope, Breadcrumb, Breadcrumbs, People, Building, $timeout, $rootScope) {
    Breadcrumbs.add(new Breadcrumb('Buildings', '/', 'Manage your existing buildings or add a new building.'));

    this.loadBuildings = function() {
      // Get buildings for this person.
      this.buildings = People.buildings({
        id : People.getCurrentId()
      });

      this.buildings.$promise.then(function(buildings) {
        $scope.currentBuildingStates = {};

        angular.forEach(buildings, function(building) {
          Building.currentState({
            id : building.id
          }).$promise.then(function(buildingState) {
            if (buildingState.currentChargeLevel) {
              $scope.currentBuildingStates[building.id] = buildingState;
            }
          });
        });
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

    this.showBuildingDeleteConfirmation = function(building) {
      this.deleteConfirmationBuilding = building;

      $("#deleteBuildingConfirmationModal").modal().show();
    };

    this.deleteBuilding = function(building) {
      Building.deleteById({
        id: building.id
      }).$promise.then(function(result) {
        this.buildingDeleteError = false;
        this.buildingDeleteSuccess = true;

        $timeout(function() {
          this.buildingDeleteSuccess = false;
        }.bind(this), 5*1000);

        this.onBuildingChange();
      }.bind(this), function() {
        this.buildingDeleteError = true;
        this.buildingDeleteSuccess = false;

        $timeout(function() {
          this.buildingDeleteError = false;
        }.bind(this), 5*1000);
      }.bind(this));
    };

    this.createNewBuilding = function() {
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
