'use strict';

/**
 * @ngdoc function
 * @name offgridmonitoringApp.controller:PeopleCtrl
 * @description
 * # PeopleCtrl
 * Allows users to create and edit people within the system.
 */
angular.module('offgridmonitoringApp')
  .controller('PeopleCtrl', function ($scope, People, Breadcrumbs, Breadcrumb) {
    Breadcrumbs.add(new Breadcrumb('People', 'people', 'Add and remove people.'));
  });
