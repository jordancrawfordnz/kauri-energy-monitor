module.exports = function setupAdmin(server) {
  	// setup the admin role.
  	var Role = server.models.Role;
  	var People = server.models.People;

  		// TODO: Don't do this in production.
  	// Check if there are any people.
  	People.count(function(err, count) {
  		if (err) {
  			console.log('An error occured getting the count of people.');
  			console.log(err);
  		}

  		// If no users, setup an admin user.
  		if (count < 1) {
			// Create admin user.
		  		// TODO: Support changing user passwords / add here in encrypted form.
			People.create([
			    { email: 'jordan.crawford@me.com', password: '8nyW6p6LTzQ7WahAj8Tk'}
			], function(err, users) {
				if (err) {
					console.log('An error occured adding default people.');
					console.log(err);
					return;
				}

				// Create an admin role.
				Role.create({
			    	name: 'admin'
				}, function(err, role) {
			    	if (err) {
			    		console.log('An error occured creating the admin role.');
						console.log(err);
						return;
			    	}
				   	
				    // Make Jordan an admin.
				    role.principals.create({
				    	principalType: 'USER',
				    	principalId: users[0].id
				    }, function(err, principal) {
				        if (err) {
							console.log('An error occured while making Jordan an admin.');
							console.log(err);
				        }
				    });
				});
			});
  		}
  	});
};