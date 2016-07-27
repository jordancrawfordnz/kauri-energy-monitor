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
    		reading.bridgeId = id;
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
	    			bridge = bridge.toJSON();
	    			var building = bridge.building;
	    			if (building.statesAreRegenerating) {
	    				// Don't do any processing if the states are currently re-generating.
	    					// The worst case scenario here is missing readings, better than processing these readings and making older readings invalid!
    					cb(null, { count : createReadingResults.length});
    					return;
	    			}
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

	    			currentStatePromise.then(function(currentState) {
	    				if (currentState) {
	    					currentState = currentState.toJSON();
	    					
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
		    				// Upsert the current state.
		    				State.upsert(currentState, function(upsertStateError, upsertStateResult) {
		    					if (updateStateError) {
		    						cb('Error saving state.');
		    						return;
		    					} else {
		    						// Get an instance of the building.
		    						Building.findById(building.id, function(findBuildingError, buildingInstance) {
		    							if (findBuildingError) {
		    								cb('Error getting the building.');
		    								return;
		    							} else {
											// Update the building to use the new state.
		    								buildingInstance.updateAttribute('currentStateId', upsertStateResult.id, function(updateBuildingError, updatedBuilding) {
		    									if (updateBuildingError) {
		    										cb('Error updating the building.');
		    										return;
		    									} else {
						    						cb(null, { count : createReadingResults.length});
		    									}
		    								});
		    							}
		    						});
		    					}
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
