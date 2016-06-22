'use strict';

/**
 * @ngdoc function
 * @name offgridmonitoringApp.controller:BuildingConfigCtrl
 * @description
 * # BuildingConfigCtrl
 * Allows building configuration including bridges and other parameters.
 */
angular.module('offgridmonitoringApp')
  .controller('BuildingConfigCtrl', function (Breadcrumb, Breadcrumbs, $routeParams, Building, SensorTypes, $timeout) {
  	var _this = this;
    this.sensorTypes = SensorTypes;
    
    function getBuilding() {
      _this.building = Building.findById({
        id : $routeParams.buildingId,
        filter : {
          include : [
            {'bridges' : 'sensors'},
            'batteryCurrentSensor'
          ]
        }
      });
    }
    getBuilding();

    // Setup breadcrumbs.
    Breadcrumbs.addPlaceholder('Building', this.building.$promise, function(building) {
      return new Breadcrumb(building.name, '/' + $routeParams.buildingId);
    });

    Breadcrumbs.add(new Breadcrumb('Configuration', '/' + $routeParams.buildingId + '/configuration', 'Configure the building parameters and bridges.'));

    this.saveBuilding = function() {
      // Save the building. Show a message on error.
      this.building.$prototype$updateAttributes({
        lvsdVoltage : this.building.lvsdVoltage,
        lvsdTime : this.building.lvsdTime,
        highPowerThreshold : this.building.highPowerThreshold,
        batteryCurrentSensor : this.building.batteryCurrentSensor
      }, function(data) {
        if (!data) {
          // Display error message.
          _this.buildingSaveError = true;
          _this.buildingSaveSuccess = false;
        } else {
          _this.buildingSaveError = false;
          _this.buildingSaveSuccess = true;
          $timeout(function() {
            _this.buildingSaveSuccess = false;
          }, 5*1000);
        }
        getBuilding();
      });
    };

  });
