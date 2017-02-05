'use strict';

/**
 * @ngdoc function
 * @name offgridmonitoringApp.directive:processingConfig
 * @description
 * # processingConfig
 * A tab for the building configuration page to allow users to set data processing options.
 */

angular.module('offgridmonitoringApp')
  .directive('processingConfig', function() {
    return {
      restrict: 'E', // to be used via an element only.
      scope: {
        building : '=building',
        showError : '&showError',
        showSuccess : '&showSuccess',
        saveBuilding : '&saveBuilding'
      },
      controller: 'ProcessingConfigCtrl',
      templateUrl: 'views/processingconfig.html'
    };
  });
