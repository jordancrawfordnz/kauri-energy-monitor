module.exports = function setupAdmin(server) {
  // Sets up an admin user.
  var Role = server.models.Role;
  var People = server.models.People;
  var RoleMapping = server.models.RoleMapping;

  // Check if there are any people.
  People.count(function(err, count) {
    if (err) {
      console.log('An error occured getting the count of people.');
      console.log(err);
    }

    // If no users, setup an admin user.
    if (count < 1) {
      // Create admin user.
      People.create([
        { email: 'default@example.com', password: 'changeme', name: 'Default User'}
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

          // Make the default user an admin.
          role.principals.create({
            principalType: RoleMapping.USER,
            principalId: users[0].id
          }, function(err, principal) {
            if (err) {
              console.log('An error occured while making the default user an admin.');
              console.log(err);
            }
          });
        });
      });
    }
  });
};
