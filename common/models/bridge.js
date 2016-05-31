var randomstring = require("randomstring");

module.exports = function(Bridge) {
	// Fetch the latest reading for the bridge.
	Bridge.latestReading = function(id, cb) {
		Bridge.app.models.Reading.findOne({
			where: {
				bridgeId : id
			},
			order: 'timestamp DESC'
		}, function(error, reading) {
			if (error) {
				cb(error);
			} else {
				cb(null, reading);
			}
		});
	};

	Bridge.remoteMethod('latestReading',
	{
		accepts: {arg: 'id', type: 'string', required: true},
		http: {path: '/:id/latestreading', verb: 'get'},
		returns: {type: 'object', root: true}
	});

	Bridge.observe('before save', function(context, callback) {
		if (context.isNewInstance) {
			// Set a secret.
			context.instance.bridgeSecret = randomstring.generate({
				length: 30
			});
		} else {
			if (context.data.bridgeSecret !== context.currentInstance.bridgeSecret) {
				return callback('The secret has changed.'); // if it has changed, don't allow save.
			}
		}
		callback();
	});
};
