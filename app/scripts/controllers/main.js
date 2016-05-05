'use strict';

/**
 * @ngdoc function
 * @name offgridmonitoringApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the offgridmonitoringApp
 */
angular.module('offgridmonitoringApp')
  .controller('MainCtrl', function (People) {
    this.people = People.find();
  });
