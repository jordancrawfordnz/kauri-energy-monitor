module.exports = function(Building) {
	Building.disableRemoteMethod('__updateById__exports');

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

				// Fetch readings.
					// TODO: Fetch in pages?

					// For each reading.
						// If a State reading point or midnight point has passed.
							// Record the State.

						// Update the current State as appropriate.
							// Create Recalibration points where appropriate.
			});
		});
	};

	Building.remoteMethod(
		'regenerateState',
		{
			http: {path: '/:id/regeneratestate', verb: 'post'},
		    accepts: [
		    	{arg: 'id', type: 'string', required: true}
		    ]
		}
	);
};
