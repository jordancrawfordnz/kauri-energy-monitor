'use strict';

/**
 * @ngdoc function
 * @name kauriApp.controller:PeopleCtrl
 * @description
 * # PeopleCtrl
 * Allows users to create and edit people within the system.
 */
angular.module('kauriApp')
  .controller('PeopleCtrl', function ($scope, $rootScope, $timeout, People, Breadcrumbs, Breadcrumb) {
    Breadcrumbs.add(new Breadcrumb('People', 'people', 'Add and remove people.'));

    $scope.loadPeople = function() {
      $scope.people = People.find();
    };

    $scope.isCurrentUser = function(person) {
      return person.id === $rootScope.user.id;
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
