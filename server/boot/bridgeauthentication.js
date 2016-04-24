module.exports = function enableBridgeAuthentication(server) {
    var Role = server.models.Role;
	Role.registerResolver('authenticatedBridge', function(role, context, callback) {
    // Reject's an un-authenticated bridge.
    function reject(err) {
      if(err) {
        return callback(err);
      }
      callback(null, false);
    }

    if (!context.modelId) {
        return reject(); // Request is not for a specific ID.
    }

    // Check if the bridge model is being acessed.
    if (context.modelName === 'Bridge') {
        var providedBridgeSecret = context.remotingContext.req.query.bridgeSecret;
        
        // Need a bridge secret to authenticate.
        if (providedBridgeSecret) {
            // Fetch this bridge.
            var Bridge = context.model;
            Bridge.findById(context.modelId, function(error, bridge) {
                if (!error && bridge) {
                    bridge = bridge.toJSON();
                    if (bridge.bridgeSecret === providedBridgeSecret) {
                        return callback(null, true);
                    }
                }
                reject();
            });
            return;
        }
    }
    return reject();
  });

};
