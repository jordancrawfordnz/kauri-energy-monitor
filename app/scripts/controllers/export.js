'use strict';

/**
 * @ngdoc function
 * @name offgridmonitoringApp.controller:ExportCtrl
 * @description
 * # ExportCtrl
 * Allows building data to be exported.
 */
angular.module('offgridmonitoringApp')
  .controller('ExportCtrl', function (Breadcrumb, Breadcrumbs, $routeParams, Building) {
  	var building = Building.findById({id : $routeParams.buildingId});

    Breadcrumbs.addPlaceholder('Building', building.$promise, function(building) {
      return new Breadcrumb(building.name, '/' + $routeParams.buildingId);
    });
    Breadcrumbs.add(new Breadcrumb('Export', '/' + $routeParams.buildingId + '/export', 'Export data for a building.'));

    // Get the current set of exports for this building.

  });
