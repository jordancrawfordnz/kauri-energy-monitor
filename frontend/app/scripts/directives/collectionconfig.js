'use strict';

/**
 * @ngdoc function
 * @name kauriApp.directive:collectionConfig
 * @description
 * # collectionConfig
 * A tab for the building configuration page to allow users to set data collection options.
 */

angular.module('kauriApp')
  .directive('collectionConfig', function() {
    return {
      restrict: 'E', // to be used via an element only.
      scope: {
        building : '=building',
        showError : '&showError',
        showSuccess : '&showSuccess',
        saveBuilding : '&saveBuilding'
      },
      controller: 'CollectionConfigCtrl',
      templateUrl: 'views/collectionconfig.html'
    };
  });
