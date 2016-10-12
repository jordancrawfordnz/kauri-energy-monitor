// Deletes invalid readings.
module.exports = function deletePuaekeInvalidReadings(server) {
	var Reading = server.models.Reading;

	console.log('Deleting Puaeke Invalid Readings');
	Reading.destroyAll({
		"and":
		[
			{"bridgeId":"572022983916fd9b1ac7ba39"},
			{"timestamp":{"gt":"1474891200"}}
		]}, function(err, result) {
			if (err) {
				console.log('An error occured deleting invalid readings.');
				console.log(err);
			} else {
				console.log('Deleted invalid readings successfully.');
				console.log(result);
			}
		});
};