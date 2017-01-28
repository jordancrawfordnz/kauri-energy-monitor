var Promise = require('promise');

module.exports = function(Building) {
	var ReadingProcessing = require('../../services/readingprocessing.js');

	Building.disableRemoteMethod('__updateById__exports');

	function removeProcessingState(updatedBuilding, regenerationState) {
		var toUpdate = {
			'statesAreRegenerating': false
		};
		if (regenerationState) {
			toUpdate.lastRegeneration = regenerationState;
		}
		// Set the building state to not processing.
		updatedBuilding.updateAttributes(toUpdate, function(updateBuildingError, updatedBuilding) {
			if (updateBuildingError) {
				console.log('Error updating the building after state re-generation.');
				console.log(updateBuildingError);
			}
		});
	}

	// On creating a person, add the current person as an owner.
		// Originally intended to do this as an 'after save' but fetching the accessToken proved difficult.
	Building.afterRemote('create', function(ctx, modelInstance, next) {
		var app = Building.app;
		app.models.People.findById(ctx.req.accessToken.userId, function(err, person) {
			if (!err && person) {
				modelInstance.people.add(person);
			}
		});
	});

	/*
		Re-generates the entire state of the system by:
			- deleting all existing State's for the building
			- re-process all Readings in the order it happened
				- create State's at their relevant intervals and perform daily adjustments
	*/
	Building.regenerateState = function(id, cb) {
		var app = Building.app;
		var State = app.models.State;
		var Recalibration = app.models.Recalibration;
		var Reading = app.models.Reading;

		// Delete all existing Recalibration points for the Building.
		Recalibration.destroyAll({
			buildingId : id
		}, function(destroyRecalibrationError) {
			if (destroyRecalibrationError) {
				cb("Failed while destroying Recalibration's.");
				console.log(destroyRecalibrationError);
				return;
			}

			// Delete all existing States for the building.
			State.destroyAll({
				buildingId : id
			}, function(destroyStateError, info) {
				if (destroyStateError) {
					cb("Failed deleting states.");
					console.log(destroyStateError);
					return;
				}

				// Get the Building with bridge.
				Building.findById(id, {
					include : ['bridges', 'energySources']
				}, function(getBuildingError, building) {
					if (getBuildingError) {
						cb("Failed to get building.");
						console.log(getBuildingError);
						return;
					}

					// Set the building state to processing.
					building.updateAttribute('statesAreRegenerating', true, function(updateBuildingError, updatedBuilding) {
						if (updateBuildingError) {
							cb("Failed to update building generation state.");
							return;
						}
						building = updatedBuilding.toJSON(); // make the building a pure JSON object.

						// Process each page serially in the background.
						ReadingProcessing.processAllReadings(building).then(function(result) {
							removeProcessingState(updatedBuilding, result);
						}, function(error) {
							console.log('Error while processing state.');
							console.log(error);
							removeProcessingState(updatedBuilding);
						});

						cb(null, true); // The job has started, return true.
					});
				});
			});
		});
	};

	Building.remoteMethod(
		'regenerateState',
		{
			http: {path: '/:id/regeneratestate', verb: 'post'},
		    accepts: [
		    	{arg: 'id', type: 'string', required: true}
		    ],
		    returns: {type: 'object', root: true}
		}
	);
};
