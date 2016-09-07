'use strict';

/**
 * @ngdoc function
 * @name offgridmonitoringApp.controller:FutureStateCtrl
 * @description
 * # FutureStateCtrl
 * Displays estimations of the future state of the system and the source data for these estimations.
 */
angular.module('offgridmonitoringApp')
  .controller('FutureStateCtrl', function ($scope, Building, $routeParams, Breadcrumbs, Breadcrumb, ChartColours, FutureStateHelper) {
  	var _this = this;

    $scope.building = Building.findById({
      id : $routeParams.buildingId,
      filter : {
        include : ['energySources']
      }
    });

    // Setup breadcrumbs.
    Breadcrumbs.addPlaceholder('Building', $scope.building.$promise, function(building) {
      return new Breadcrumb(building.name, '/' + $routeParams.buildingId);
    });
    Breadcrumbs.add(new Breadcrumb('Future State', '/' + $routeParams.buildingId + '/future', 'Estimations of the future state of the system and the data that powers it.'));

  });
