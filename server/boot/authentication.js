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

		console.log('building owner resolver');
    console.log(role);
    console.log(context.modelName);

    // Check the current user is an owner of the building.
    if (context.modelName === 'Building') {
    	console.log('is a building');

    	if (!context.modelId) {
    		// Request is not for a specific ID.
    		reject();
    		return;
    	}

    	// TODO: May need to make a query for this person to see if they have this building.
    	// console.log(context.models.People.prototype);
    	// console.log(Building.app.models.People.prototype).
    	// console.log(context);
    	var People = server.models.People;
    	People.findById(userId, {include : 'buildings'}, function(error, person) {
    		if (error) {
    			console.log('Could not get the person.');
    			console.log(error);
    		} else {
    			console.log(person);
    			var personsBuildings = person.buildings;
    			console.log(personsBuildings.prototype);
    			// TODO: how to actually access the buildings through here?
    		}
    	});	

    	var Building = context.model;

    	Building.findById(context.modelId, function(error, building) {
  			if (error) {
    			console.log('Could not get building.');
    			console.log(error);
    		} else {
    			console.log('building');

    			// building.get__people(function(error, people) {
    			// 	if (error) {
		    	// 		console.log('Could not get people for building.');
		    	// 		console.log(error);
		    	// 	} else {
		    	// 		console.log('people for building');
		    	// 		console.log(people);
		    	// 	}
    			// });
    		}
    	});

    	// context.model.get__people(function(error, people) {
    	// 	if (error) {
    	// 		console.log('Could not get people for building.');
    	// 		console.log(error);
    	// 	} else {
    	// 		console.log('people for building');
    	// 		console.log(people);
    	// 	}
    	// });
    }

    // Check the current user is an owner of the Bridge's building.
    if (context.modelName === 'Bridge') {
    	// Get the building for the bridge.

    	// Check access to the building is allowed.

    }

    if (context.modelName === 'Sensor') {
    	// Get the bridge for the sensor.

    	// Check access to the bridge is allowed.
    }

    // // check if userId is in team table for the given project id
    // context.model.findById(context.modelId, function(err, project) {
    //   if(err || !project) {
    //     reject(err);
    //   }
    //   var Team = server.models.Team;
    //   Team.count({
    //     ownerId: project.ownerId,
    //     memberId: userId
    //   }, function(err, count) {
    //     if (err) {
    //       return reject(err);
    //     }
    //     callback(null, count > 0); // true = is a team member
    //   });
    // });

  });

};
