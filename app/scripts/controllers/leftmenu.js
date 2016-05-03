'use strict';

/**
 * @ngdoc function
 * @name offgridmonitoringApp.controller:LeftMenuCtrl
 * @description
 * # LeftMenuCtrl
 * Controller for the left navigation menu.
 */
angular.module('offgridmonitoringApp')
  .controller('LeftMenuCtrl', function (People) {
    this.buildings = People.buildings({
      id : People.getCurrentId()
    });
  });
