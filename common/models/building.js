var Promise = require('promise');

module.exports = function(Building) {
	var StateOfCharge = require('../../services/stateofcharge.js');

	Building.disableRemoteMethod('__updateById__exports');

	// Gets the latest state for the building, based on the most recent timestamp.
	Building.latestState = function(id, cb) {
		Building.app.models.State.findOne({
			where: {
				buildingId : id
			},
			order: 'timestamp DESC'
		}, function(error, state) {
			if (error) {
				cb(error);
			} else {
				cb(null, state);
			}
		});
	};

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
					include : 'bridges'
				}, function(getBuildingError, building) {
					if (getBuildingError) {
						cb("Failed to get building.");
						console.log(getBuildingError);
						return;
					}
					var building = building.toJSON(); // make the building a pure JSON object.



					// Process each page serially.
					StateOfCharge.processAllReadings(building).then(function(result) {
						cb(null, result);
					}, function(error) {
						console.log(error);
						cb('An error occured while processing Readings.');
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

	Building.remoteMethod('latestState',
	{
		accepts: {arg: 'id', type: 'string', required: true},
		http: {path: '/:id/lateststate', verb: 'get'},
		returns: {type: 'object', root: true}
	});
};
