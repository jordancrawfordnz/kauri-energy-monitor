'use strict';

/**
 * @ngdoc function
 * @name offgridmonitoringApp.controller:BuildingConfigCtrl
 * @description
 * # BuildingConfigCtrl
 * Allows building configuration including bridges and other parameters.
 */
angular.module('offgridmonitoringApp')
  .controller('BuildingConfigCtrl', function (Breadcrumb, Breadcrumbs, $routeParams, Building, SensorTypes, $timeout, EnergySource) {
  	var _this = this;
    this.sensorTypes = SensorTypes;
    var buildingId = $routeParams.buildingId;

    function getBuilding() {
      _this.building = Building.findById({
        id : buildingId,
        filter : {
          include : [
            {'bridges' : 'sensors'},
            'batteryCurrentSensor'
          ]
        }
      });
    }
    getBuilding();

    this.refreshBuilding = function() {
      getBuilding();
    };

    this.regenerateStates = function() {
      var _this = this;
      Building.regenerateState({
        id : this.building.id
      }).$promise.then(function() {
        _this.refreshBuilding();
      });
    };

    // Setup breadcrumbs.
    Breadcrumbs.addPlaceholder('Building', this.building.$promise, function(building) {
      return new Breadcrumb(building.name, '/' + buildingId);
    });

    Breadcrumbs.add(new Breadcrumb('Configuration', '/' + buildingId + '/configuration', 'Configure the building parameters and bridges.'));

    this.saveBuilding = function() {
      // Save the building. Show a message on error.
      this.building.$prototype$updateAttributes({
        lvsdVoltage : this.building.lvsdVoltage,
        lvsdTime : this.building.lvsdTime,
        highPowerThreshold : this.building.highPowerThreshold,
        batteryCurrentSensor : this.building.batteryCurrentSensor
      }, function(data) {
        _this.buildingSaveError = false;
        _this.buildingSaveSuccess = true;
        $timeout(function() {
          _this.buildingSaveSuccess = false;
        }, 5*1000);
        getBuilding();
      }, function() {
        // Display error message.
        _this.buildingSaveError = true;
        _this.buildingSaveSuccess = false;
      });
    };

    this.energySources = [];
    
    // Load initial energy sources.
    Building.energySources({
      id : buildingId
    }).$promise.then(function(energySources) {
      angular.forEach(energySources, function(energySourceData) {
        _this.energySources.push({
          data : energySourceData,
          hasBeenSaved : true
        });
      });
    });

    // Creates an empty energy source.
    this.newEnergySource = function() {
      this.energySources.push({
        data : {},
        hasBeenSaved : false
      });
    };

    function handleEnergySourceSave(promise, energySource) {
      promise.then(function(energySourceData) {
        energySource.data = energySourceData;
        energySource.hasBeenSaved = true;
        energySource.saveError = false;
        energySource.saveSuccess = true;
        $timeout(function() {
          energySource.saveSuccess = false;
        }, 5*1000);
      }, function(error) {
        energySource.saveError = true;
        energySource.saveSuccess = false;
      });
    };

    // Saves an energy source that has already been created.
    this.saveEnergySource = function(energySource) {
      handleEnergySourceSave(energySource.data.$save(), energySource);
    };

    // Performs a creation operation on an energy source.
    this.createEnergySource = function(energySource) {
      handleEnergySourceSave(Building.energySources.create({
        id : buildingId
      }, energySource.data).$promise, energySource);
    };

    // Performs a deletion operation on an energy source.
    this.deleteEnergySource = function(energySource) {
      var index = _this.energySources.indexOf(energySource);
      if (index !== -1) {
        if (energySource.hasBeenSaved) {
          energySource.data.$delete().then(function() {
            // Remove the energy source from the list.
            _this.energySources.splice(index, 1);
          });
        } else {
          // Remove the energy source from the list.
          _this.energySources.splice(index, 1);
        }
      }
    };
  });
