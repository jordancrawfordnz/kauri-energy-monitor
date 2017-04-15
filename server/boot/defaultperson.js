module.exports = function setupAdmin(server) {
  // Sets up a default person.
  var Role = server.models.Role;
  var People = server.models.People;
  var RoleMapping = server.models.RoleMapping;

  // Check if there are any people.
  People.count(function(err, count) {
    if (err) {
      console.log('An error occured getting the count of people.');
      console.log(err);
    }

    // If no people, setup a default person.
    if (count < 1) {
      // Create admin person.
      People.create([
        { email: 'default@example.com', password: 'changeme', name: 'Default Person'}
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

          // Make the default person an admin.
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
