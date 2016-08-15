'use strict';

/**
 * @ngdoc function
 * @name offgridmonitoringApp.controller:BuildingConfigCtrl
 * @description
 * # BuildingConfigCtrl
 * Allows building configuration including bridges and other parameters.
 */
angular.module('offgridmonitoringApp')
  .controller('BuildingConfigCtrl', function (Breadcrumb, Breadcrumbs, $routeParams, $rootScope, $scope, Building, SensorTypes, $timeout, $interval, EnergySource) {
  	var _this = this;
    this.sensorTypes = SensorTypes;
    var buildingId = $routeParams.buildingId;
    this.onlyProcessAfterObject = null;
    this.onlyProcessUntilObject = null;

    function getBuilding() {
      _this.building = Building.findById({
        id : buildingId,
        filter : {
          include : [
            {'bridges' : 'sensors'}
          ]
        }
      });
      // Setup the date objects.
      _this.building.$promise.then(function() {
        if (_this.building.onlyProcessAfter) {
          _this.onlyProcessAfterObject = moment.unix(_this.building.onlyProcessAfter);
        } else {
          _this.onlyProcessAfterObject = null;
        }

        if (_this.building.onlyProcessUntil) {
          _this.onlyProcessUntilObject = moment.unix(_this.building.onlyProcessUntil);
        } else {
          _this.onlyProcessUntilObject = null;
        }

        _this.regenerationStatus = {
          statesAreRegenerating : _this.building.statesAreRegenerating,
          lastRegeneration : _this.building.lastRegeneration
        };
      });
    }
    getBuilding();

    this.datePickerOptions = {
      icons : {
        next: 'glyphicon glyphicon-arrow-right',
        previous: 'glyphicon glyphicon-arrow-left',
        up: 'glyphicon glyphicon-arrow-up',
        down: 'glyphicon glyphicon-arrow-down'
      },
      format : $rootScope.dateTimeFormat,
      timeZone : 'Pacific/Auckland'
    };

    this.regenerateStates = function() {
      var _this = this;
      Building.regenerateState({
        id : this.building.id
      }).$promise.then(function() {
        _this.regenerationStatus.statesAreRegenerating = true;
          
        // Get data about the building until it has finished re-generation.
        _this.automaticallyRefreshGenerationStatus = $interval(function() {
          Building.findById({id : buildingId}, function(building) {
            _this.regenerationStatus = {
              statesAreRegenerating : building.statesAreRegenerating,
              lastRegeneration : building.lastRegeneration
            };
            // Stop automatically refreshing after the states are finished refreshing.
            if (!building.statesAreRegenerating) {
              $interval.cancel(_this.automaticallyRefreshGenerationStatus);
            }
          });
        }, 10*1000);
      });
    };

    // Stop automatically refreshing for state change.
    $scope.$on('$destroy', function() {
      if (_this.automaticallyRefreshGenerationStatus) {
        $interval.cancel(_this.automaticallyRefreshGenerationStatus);
      }
    });

    // Setup breadcrumbs.
    Breadcrumbs.addPlaceholder('Building', this.building.$promise, function(building) {
      return new Breadcrumb(building.name, '/' + buildingId);
    });

    Breadcrumbs.add(new Breadcrumb('Configuration', '/' + buildingId + '/configuration', 'Configure the building parameters and bridges.'));

    this.saveBuilding = function() {
      // Update the 'onlyProcessAfter' and 'onlyProcessUntil' values from the moment objects.
      if (this.onlyProcessAfterObject) {
        this.building.onlyProcessAfter = this.onlyProcessAfterObject.unix();
      } else {
        this.building.onlyProcessAfter = null;
      }
      
      if (this.onlyProcessUntilObject) {
        this.building.onlyProcessUntil = this.onlyProcessUntilObject.unix();
      } else {
        this.building.onlyProcessUntil = null;
      }

      // Save the building. Show a message on error.
      this.building.$save().then(function(data) {
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
