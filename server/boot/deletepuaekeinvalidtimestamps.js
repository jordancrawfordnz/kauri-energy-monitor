// Deletes a region of data from when the Puaeke bridge was having its time adjusted.
module.exports = function deletePuaekeInvalidTimestamps(server) {
	var Reading = server.models.Reading;

	console.log('Deleting Puaeke Invalid Timestamps');
	Reading.destroyAll({
		"and":
		[
			{"bridgeId":"572022983916fd9b1ac7ba39"},
			{"timestamp":{"gt":"1464729820"}},
			{"timestamp":{"lt":"1464729990"}}
		]}, function(err, result) {
			if (err) {
				console.log('An error occured deleting invalid timestamps.');
				console.log(err);
			} else {
				console.log('Deleted invalid timestamps successfully.');
				console.log(result);
			}
		});
};