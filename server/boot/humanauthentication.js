module.exports = function enableHumanAuthentication(server) {
  // enable authentication
  server.enableAuth();

  // Returns true if the person is a building owner.
  function isPersonBuildingOwner(buildingOwners, userId) {
    // Check if the current user is one of the people allowed in the building.
    for (var i = 0; i < buildingOwners.length; i++) {
      if (JSON.stringify(buildingOwners[i].id) === JSON.stringify(userId)) {
        return true;
      }
    }
    return false;
  }

  var Role = server.models.Role;
  Role.registerResolver('buildingOwner', function(role, context, callback) {
    // Reject's a person who is not a buildingOwner.
    function reject(err) {
      if(err) {
        return callback(err);
      }
      callback(null, false);
    }

    var userId = context.accessToken.userId;
    if (!userId) {
      return reject(); // do not allow anonymous users
    }

    if (!context.modelId) {
      return reject(); // Request is not for a specific ID.
    }

    // Check the current user is an owner of the building.
    if (context.modelName === 'Building') {
      var Building = context.model;
      Building.findById(context.modelId, {include : 'people'}, function(error, building) {
        if (!error && building) {
          building = building.toJSON();

          if (building.people) {
            if (isPersonBuildingOwner(building.people, userId)) {
              return callback(null, true); // allow the user access.
            }
          }
        }
        return reject();
      });
    } else if (context.modelName === 'Export') { // Check the current user is an owner of the Building for the Export.
      var Export = context.model;
      Export.findById(context.modelId, {include : {building : 'people'} }, function(error, exportInstance) {
        if (!error && exportInstance) {
          exportInstance = exportInstance.toJSON();

          if (exportInstance.building.people) {
            if (isPersonBuildingOwner(exportInstance.building.people, userId)) {
              return callback(null, true); // allow the user access.
            }
          }
        }
        return reject();
      });
    } else if (context.modelName === 'Recalibration') { // Check the current user is an owner of the Building for the Recalibration.
      var Recalibration = context.model;
      Recalibration.findById(context.modelId, {include : {building : 'people'} }, function(error, recalibrationInstance) {
        if (!error && recalibrationInstance) {
          recalibrationInstance = recalibrationInstance.toJSON();

          if (recalibrationInstance.building.people) {
            if (isPersonBuildingOwner(recalibrationInstance.building.people, userId)) {
              return callback(null, true); // allow the user access.
            }
          }
        }
        return reject();
      });
    } else if (context.modelName === 'State') { // Check the current user is an owner of the Building for the State.
      var State = context.model;
      State.findById(context.modelId, {include : {building : 'people'} }, function(error, stateInstance) {
        if (!error && stateInstance) {
          stateInstance = stateInstance.toJSON();

          if (stateInstance.building && stateInstance.building.people) {
            if (isPersonBuildingOwner(stateInstance.building.people, userId)) {
              return callback(null, true); // allow the user access.
            }
          }
        }
        return reject();
      });
    } else if (context.modelName === 'FutureState') { // Check the current user is an owner of the Building for the FutureState.
      var FutureState = context.model;
      FutureState.findById(context.modelId, {include : {building : 'people'} }, function(error, futureStateInstance) {
        if (!error && futureStateInstance) {
          futureStateInstance = futureStateInstance.toJSON();

          if (futureStateInstance.building && futureStateInstance.building.people) {
            if (isPersonBuildingOwner(futureStateInstance.building.people, userId)) {
              return callback(null, true); // allow the user access.
            }
          }
        }
        return reject();
      });
    } else if (context.modelName === 'Bridge') { // Check the current user is an owner of the Bridge's building.
      var Bridge = context.model;

      Bridge.findById(context.modelId, {include : {building : ['people']} }, function(error, bridge) {
        if (!error && bridge) {
          bridge = bridge.toJSON();

          // If the bridge has an associated building.
          if (bridge.building && bridge.building.people) {
            if (isPersonBuildingOwner(bridge.building.people, userId)) {
              return callback(null, true); // allow the user access.
            }
          }
        }
        return reject();
      });
    } else if (context.modelName === 'EnergySource') { // Check the current user is an owner of the EnergySource's building.
      var EnergySource = context.model;

      EnergySource.findById(context.modelId, {include : {building : ['people']} }, function(error, energySource) {
        if (!error && energySource) {
          energySource = energySource.toJSON();

          // If the energySource has an associated building.
          if (energySource.building && energySource.building.people) {
            if (isPersonBuildingOwner(energySource.building.people, userId)) {
              return callback(null, true); // allow the user access.
            }
          }
        }
        return reject();
      });
    } else if (context.modelName === 'Sensor') {
      var Bridge = context.model;

      Bridge.findById(context.modelId, {include : {bridge : {building : ['people']} } }, function(error, sensor) {
        if (!error && sensor) {
          sensor = sensor.toJSON();

          // If the sensor has an associated bridge, building and people.
          if (sensor.bridge && sensor.bridge.building && sensor.bridge.building.people) {
            if (isPersonBuildingOwner(sensor.bridge.building.people, userId)) {
              return callback(null, true); // allow the user access.
            }
          }
        }
        return reject();
      });
    } else if (context.modelName === 'Reading') {
      var Reading = context.model;

      Reading.findById(context.modelId, {include : {bridge : {building : ['people']} } }, function(error, reading) {
        if (!error && reading) {
          reading = reading.toJSON();

          // If the reading has an associated bridge, building and people.
          if (reading.bridge && reading.bridge.building && reading.bridge.building.people) {
            if (isPersonBuildingOwner(reading.bridge.building.people, userId)) {
              return callback(null, true); // allow the user access.
            }
          }
        }
        return reject();
      });
    } else {
      // The person must not be a building owner.
      return reject();
    }
  });
};
