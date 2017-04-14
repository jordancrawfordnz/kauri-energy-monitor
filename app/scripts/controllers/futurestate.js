'use strict';

/**
 * @ngdoc function
 * @name kauriApp.controller:FutureStateCtrl
 * @description
 * # FutureStateCtrl
 * Displays estimations of the future state of the system.
 */
angular.module('kauriApp')
  .controller('FutureStateCtrl', function ($scope, Building, $routeParams, Breadcrumbs, Breadcrumb, ChartColours, FutureStateHelper, FutureState) {
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
    Breadcrumbs.add(new Breadcrumb('Future State', '/' + $routeParams.buildingId + '/future', 'Estimations of the future state of the system.'));

    // Get all the Future States.
    $scope.futureStates = Building.futureStates({ id : $routeParams.buildingId });
  });
