module.exports = function(Reading) {
	Reading.observe('before save', function(context, callback) {
		var data;
		if (context.isNewInstance) {
			data = context.instance;
		} else {
			data = context.data;
		}

		var valueKeys = Object.keys(data.values);
		if (valueKeys.length === 0) {
			callback('Must provide at least one value.');
		}

		// Get the bridge with the sensors.
		var Bridge = Reading.app.models.Bridge;
		Bridge.findById(data.bridgeId, {include : 'sensors'}, function(error, bridge) {
			if (!error && bridge) {
				bridge = bridge.toJSON();

				// Check that the sensor ID's are valid sensors and match the bridge.
				var allKeysValid = true;
				for (var currentKey = 0; currentKey < valueKeys.length; currentKey++) {
					var keyValid = false;
					for (var currentSensor = 0; currentSensor < bridge.sensors.length; currentSensor++) {
						if (valueKeys[currentKey] == bridge.sensors[currentSensor].id) {
							keyValid = true;
							break;
						}
					}
					if (!keyValid) {
						allKeysValid = false;
						break;
					}
				}

				if (!allKeysValid) {
					callback('All value keys must be valid sensor IDs for the bridge.');
				} else {
					callback();
				}
			} else {
				callback('Invalid bridge ID.');
			}
		});
	});
};
