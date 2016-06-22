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

		// Delete all existing States for the building.
		State.destroyAll({
			building : id
		}, function(error, info) {
			if (error) {
				cb("Failed deleting states.");
				console.log(error);
				return;				
			}
			console.log('destroy result');
			console.log(info);
		});

		console.log('called regenerateState');
		console.log('id');
		console.log(id);
		cb('something');
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
