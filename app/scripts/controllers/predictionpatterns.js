'use strict';

/**
 * @ngdoc function
 * @name offgridmonitoringApp.controller:PredictionPatternCtrl
 * @description
 * # PredictionPatternCtrl
 * Displays the source data used for future state predictions.
 */
angular.module('offgridmonitoringApp')
  .controller('PredictionPatternCtrl', function ($scope, Building, $routeParams, Breadcrumbs, Breadcrumb, ChartColours, FutureStateHelper, FutureState) {
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
    Breadcrumbs.add(new Breadcrumb('Prediction Patterns', '/' + $routeParams.buildingId + '/patterns', 'See the data that powers future state estimations.'));

  });
