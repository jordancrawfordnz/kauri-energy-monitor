module.exports = function enableAuthentication(server) {
  // enable authentication
  server.enableAuth();

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
    	// TODO: May need to make a query for this person to see if they have this building.
    	var Building = context.model;

    	Building.findById(context.modelId, {include : 'people'}, function(error, building) {
  			if (!error && building) {
                building = building.toJSON();
                var peopleAllowedInBuilding = building.people;
                
                // Check if the current user is one of the people allowed in the building.
                for (var i = 0; i < peopleAllowedInBuilding.length; i++) {
                    if (peopleAllowedInBuilding[i].id === userId) {
                        callback(null, true); // allow the user access.
                        return;
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
                console.log(bridge);

                console.log(bridge.building.people);
            }
            return reject();
        });
        // Get the building for the bridge.


    	// Check access to the building is allowed.

    } else if (context.modelName === 'Sensor') {
    	// Get the bridge for the sensor.

    	// Check access to the bridge is allowed.
        return reject();
    } else {
        // The person must not be a building owner.
        return reject();
    }

  });

};
