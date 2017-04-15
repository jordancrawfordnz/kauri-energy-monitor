'use strict';

/**
 * @ngdoc function
 * @name kauriApp.controller:BuildingPeopleCtrl
 * @description
 * # BuildingPeopleCtrl
 * Allows a user to add or remove people from a building.
 */
angular.module('kauriApp').controller('BuildingPeopleCtrl', function ($scope, $rootScope, People, Building, $interval) {
  $scope.getBuildingPeople = function() {
    return Building.people({
      id: $scope.building.id
    });
  };

  $scope.onBuildingPeopleChange = function() {
    $scope.wrappedAllPeople = [];

    $scope.getBuildingPeople().$promise.then(function(buildingPeople) {
      angular.forEach($scope.allPeople, function(person) {
        var inBuilding = false;
        angular.forEach(buildingPeople, function(buildingPerson) {
          if (person.id === buildingPerson.id) {
            inBuilding = true;
          }
        });

        $scope.wrappedAllPeople.push({
          person: person,
          inBuilding: inBuilding
        });
      });
    });
  };

  $scope.loadAllPeople = function() {
    $scope.allPeople = People.find();
    $scope.allPeople.$promise.then($scope.onBuildingPeopleChange);
  };

  $scope.addPersonToBuilding = function(wrappedPerson) {
    Building.people.link({
      id: $scope.building.id,
      fk: wrappedPerson.person.id
    }, null).$promise.then(function() {
      $scope.onBuildingPeopleChange();
      $scope.showSuccess({
        title: "'" + wrappedPerson.person.name + "' added successfully"
      });
    }, function() {
      $scope.showError({
        title: "Could not add '" + wrappedPerson.person.name + "'",
        body: "Please try again"
      });
    });
  };

  $scope.isCurrentUser = function(wrappedPerson) {
    return wrappedPerson.person.id === $rootScope.user.id;
  };

  $scope.removePersonFromBuilding = function(wrappedPerson) {
    Building.people.unlink({
      id: $scope.building.id,
      fk: wrappedPerson.person.id
    }).$promise.then(function() {
      $scope.onBuildingPeopleChange();
      $scope.showSuccess({
        title: "'" + wrappedPerson.person.name + "' removed successfully"
      });
    }, function() {
      $scope.showError({
        title: "Could not remove '" + wrappedPerson.person.name + "'",
        body: "Please try again"
      });
    });
  };

  $scope.waitForBuildingInterval = $interval(function() {
    if ($scope.building.id) {
      $scope.loadAllPeople();
      $interval.cancel($scope.waitForBuildingInterval);
    }
  }, 10);
});
