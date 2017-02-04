'use strict';

/**
 * @ngdoc function
 * @name offgridmonitoringApp.controller:CollectionConfigCtrl
 * @description
 * # CollectionConfigCtrl
 * A tab for the building configuration page to allow users to set data config options.
 */
angular.module('offgridmonitoringApp').controller('CollectionConfigCtrl', function ($scope, Building) {
  $scope.bridges = Building.bridges({
    id: $scope.building.id,
    filter : {
      include : ['sensors']
    }
  });
});
