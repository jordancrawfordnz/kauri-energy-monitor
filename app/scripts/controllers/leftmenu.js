'use strict';

/**
 * @ngdoc function
 * @name kauriApp.controller:LeftMenuCtrl
 * @description
 * # LeftMenuCtrl
 * Controller for the left navigation menu.
 */
angular.module('kauriApp')
  .controller('LeftMenuCtrl', function (People, $location, $scope) {
    var _this = this;
    function initialiseBuildings() {
        _this.buildings = People.buildings({
        id : People.getCurrentId()
      });
    };
    initialiseBuildings();
    $scope.$on('login', initialiseBuildings);
    $scope.$on('refreshBuildings', initialiseBuildings);

    this.generalNavigation = [
      {
        name : 'Buildings',
        icon : 'building',
        path : ''
      },
      {
        name : 'People',
        icon : 'users',
        path : 'people'
      }
    ];

    this.perBuildingNavigation = [
      {
        name : 'Summary',
        icon : 'area-chart',
        path : ''
      },
      {
        name : 'Configuration',
        icon : 'cogs',
        path : 'configuration'
      },
      {
        name : 'Sensor Readings',
        icon : 'table',
        path : 'reading'
      },
      {
        name : 'Export',
        icon : 'file-o',
        path : 'export'
      },
      {
        name : 'Battery State',
        icon : 'battery-three-quarters',
        path : 'states'
      },
      {
        name : 'Calibration Points',
        icon : 'table',
        path : 'calibrations'
      },
      {
        name : 'Prediction Patterns',
        icon : 'clock-o',
        path : 'patterns'
      },
      {
        name : 'Future State',
        icon : 'magic',
        path : 'future'
      }
    ];

    this.isGeneralNavigationSelected = function(navItem) {
      return $location.$$path === '/' + navItem.path;
    };

    this.isPerBuildingNavigationSelected = function(navItem, building) {
      if (navItem.path === '') {
        return $location.$$path === '/' + building.id;
      }
      else {
        return $location.$$path === '/' + building.id + '/' + navItem.path;
      }
    };

  });
