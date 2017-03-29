'use strict';

/**
 * @ngdoc function
 * @name offgridmonitoringApp.directive:coreBuildingConfig
 * @description
 * # coreBuildingConfig
 * A tab for the building configuration page to allow users to setup a building.
 */

angular.module('offgridmonitoringApp')
  .directive('coreBuildingConfig', function() {
    return {
      restrict: 'E', // to be used via an element only.
      scope: {
        building : '=building',
        showError : '&showError',
        showSuccess : '&showSuccess',
        saveBuilding : '&saveBuilding'
      },
      templateUrl: 'views/corebuildingconfig.html'
    };
  });
