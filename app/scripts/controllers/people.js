'use strict';

/**
 * @ngdoc function
 * @name offgridmonitoringApp.controller:PeopleCtrl
 * @description
 * # PeopleCtrl
 * Allows users to create and edit people within the system.
 */
angular.module('offgridmonitoringApp')
  .controller('PeopleCtrl', function ($scope, $timeout, People, Breadcrumbs, Breadcrumb) {
    Breadcrumbs.add(new Breadcrumb('People', 'people', 'Add and remove people.'));

    $scope.loadPeople = function() {
      $scope.people = People.find();
    };

    $scope.addPerson = function() {
      People.create($scope.person).$promise.then(function(person) {
        $scope.loadPeople();
        $scope.hasCreateSucceeded = true;
        $scope.hasCreateFailed = false;
        $timeout(function() {
          $scope.hasCreateSucceeded = false;
        }, 5000);
      }, function() {
        $scope.hasCreateSucceeded = false;
        $scope.hasCreateFailed = true;
      });
    };

    $scope.showPersonDeleteConfirmation = function(person) {
      $scope.deleteConfirmationPerson = person;

      $("#deletePersonConfirmationModal").modal().show();
    };

    $scope.deletePerson = function(person) {
      People.destroyById({
        id: person.id
      }).$promise.then(function(result) {
        $scope.loadPeople();
        $scope.hasDeleteSucceeded = true;
        $scope.hasDeleteFailed = false;
        $timeout(function() {
          $scope.hasDeleteSucceeded = false;
        }, 5000);
      }, function() {
        $scope.hasDeleteSucceeded = false;
        $scope.hasDeleteFailed = true;
      });
    };

    $scope.loadPeople();
  });
