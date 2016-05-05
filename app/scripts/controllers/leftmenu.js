'use strict';

/**
 * @ngdoc function
 * @name offgridmonitoringApp.controller:LeftMenuCtrl
 * @description
 * # LeftMenuCtrl
 * Controller for the left navigation menu.
 */
angular.module('offgridmonitoringApp')
  .controller('LeftMenuCtrl', function (People, $location) {
    this.buildings = People.buildings({
      id : People.getCurrentId()
    });

    this.generalNavigation = [
      {
        name : 'My Buildings',
        icon : 'building',
        path : ''
      }
    ];

    this.perBuildingNavigation = [
      {
        name : 'Summary',
        icon : 'area-chart',
        path : 'summary'
      },
      {
        name : 'Bridges',
        icon : 'laptop',
        path : 'bridge'
      },
      {
        name : 'Readings',
        icon : 'table',
        path : 'reading'
      }
    ];

    this.isGeneralNavigationSelected = function(navItem) {
      return $location.$$path === '/' + navItem.path;
    };

    this.isPerBuildingNavigationSelected = function(navItem, building) {
      return $location.$$path === '/' + building.id + '/' + navItem.path;
    };

  });
