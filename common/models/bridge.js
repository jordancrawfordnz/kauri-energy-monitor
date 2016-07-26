var randomstring = require("randomstring");
var Promise = require('promise');
var StateOfCharge = require('../../services/stateofcharge.js');

module.exports = function(Bridge) {
	Bridge.disableRemoteMethod('__create__readings');

	Bridge.recordReadings = function(id, data, cb) {
		var Reading = Bridge.app.models.Reading;
		var State = Bridge.app.models.State;
		var Building = Bridge.app.models.Building;
		
		var toProcess;
      	if (Array.isArray(data)) {
      		toProcess = data;
    	} else {
    		toProcess = [data];
    	}

    	var createPromises = [];
    	// Create each item.
    	toProcess.forEach(function(reading) {
    		createPromises.push(new Promise(function(resolve, reject) {
    			Reading.create(reading, function(error, result) {
	    			if (error) {
	    				reject(error);
	    			} else {
	    				resolve(result);
	    			}
	    		});
    		}));
    	});

    	Promise.all(createPromises).then(function(createReadingResults) {
    		// If all readings created successfully.

    		// Get the bridge, including the building, the current state and the last reading.
	    	Bridge.findById(id, {
	    		include : {'building' : 'energySources'}
	    	}, function(error, bridge) {
	    		if (error) {
	    			cb('Could not find the bridge.');
	    		} else {
	    			// TODO: What happens if only one result present?
	    			// TODO: Clean up logging.
	    			// TODO: Make it return something. Current state?
	    			// TODO: Setup the bridge to support the new route.
	    			// TODO: Test with a large piece of simulated data from my computer (i.e.: an hour worth of data).
	    			// TODO: Deploy new bridge, frontend, backend, etc.
	    			bridge = bridge.toJSON();
	    			var building = bridge.building;
	    			var currentStatePromise = new Promise(function(resolve, reject) {
    					if (building.currentStateId) {
    						// Get the current state with the reading included.
		    				State.findById(bridge.building.currentStateId, {
		    					include : 'reading'
		    				}, function(error, currentStateResult) {
		    					if (error) {
		    						reject(error);
		    					} else {
		    						resolve(currentStateResult);
		    					}
		    				});
		    			} else {
		    				resolve(null);
		    			}
    				});

	    			var currentStateId;
	    			currentStatePromise.then(function(currentState) {
	    				if (currentState) {
	    					currentState = currentState.toJSON();
	    					currentStateId = currentState.id;
	    					delete currentState.id; // Remove the current state's ID when in use.

	    					var latestReading = null;
		    				if (currentState && currentState.reading) {
		    					latestReading = currentState.reading;
		    				}
	    				}

	    				if (!currentState) {
	    					// Use the state template as the starting state.
	    					currentState = StateOfCharge.getStateTemplate(building);
	    				}
	    				
	    				StateOfCharge.processReadingsSerially(building, createReadingResults, latestReading, currentState)
		    			.then(function(processReadingResult) {
		    				new Promise(function(resolve, reject) {
		    					if (currentStateId) {
			    					// If the current state had an ID, save it.

			    					// Copy the current state and include the ID.
			    					var currentStateCopy = JSON.parse(JSON.stringify(currentState));
			    					currentStateCopy.id = currentStateId;
			    					State.update(currentStateCopy, function(updateStateError, updateStateResult) {
			    						if (updateStateError) {
			    							reject(updateStateError);
			    						} else {
			    							resolve(updateStateResult);
			    						}
			    					});
			    				} else {
			    					// If the current state has no ID, create it and update the building's ID.
			    					State.create(currentState, function(createStateError, createStateResult) {
			    						if (createStateError) {
			    							reject(createStateError);
			    						} else {
			    							// Update the building to use the new currentStateId.
				    						building.currentStateId = createStateResult.id;
				    						Building.update(building, function(updateBuildingError, updatedBuilding) {
				    							if (updateBuildingError) {
				    								reject(updateBuildingError);
				    							} else {
				    								resolve(updatedBuilding);
				    							}
				    						});
			    						}
			    					});
			    				}
		    				}).then(function() {
		    					cb(null, { count : createReadingResults.length});
		    				}, function(persistStateError) {
		    					cb('Error persisting end state.');
		    				});
		    			}, function() {
		    				cb('Error processing readings.');
		    			});
	    			}, function() {
	    				cb('Failed to get the current state.');
	    			});
	    		}
	    	});
    	}, function() {
    		cb('Could not save readings.');
    	});
	};

	Bridge.remoteMethod('recordReadings', {
		accepts: [{arg: 'id', type: 'string', required: true}, {arg: 'data', type: 'array', http: {source: 'body'}}],
		returns: {type: 'object', root: true},
		http: {
			path: '/:id/recordreadings'
		}
	});

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
