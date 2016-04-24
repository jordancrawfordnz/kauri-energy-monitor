var randomstring = require("randomstring");

module.exports = function(Bridge) {
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
