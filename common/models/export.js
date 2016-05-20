var moment = require('moment');
var CSVExport = require('../../services/csvexport.js');

module.exports = function(Export) {
	Export.observe('before save', function(context, callback) {
		if (context.isNewInstance) {
			// TODO: Remove disallowed API methods and only allow access via a building.

			// Check the building ID is provided.
			var buildingId = context.instance.buildingId;
			if (!buildingId) {
				return callback('No building ID provided.');
			}

			// Check the after and until parameters if provided.
			var after = context.instance.after;
			var until = context.instance.until;
			if (after && until && after > until) {
				callback('The after date must come before the until date.');
				return;
			}

			// Get the building.
			var Building = Export.app.models.Building;
			Building.findOne(buildingId, function(error, building) {
				if (error || !building) {
					context('Failed to get the building.');
				} else {
					var currentTime = Math.round(new Date().getTime()/1000);
					var fileName = 'Export_' + building.name + '_Generated' +
						moment.unix(currentTime).format('DD-MM-YY') + '.csv';

					// Set the generated timestamp.
					context.instance.generated = currentTime;

					// Set the filename.
					context.instance.filename = fileName;

					// Fill in initial status.
					context.instance.status = 'pending';

					// Start the job running.
						// TODO: Switch to a cron job based method or some other event in response (for better scalability)
						// TODO: Support resuming a job if it crashes.
					CSVExport.generateCSV(context.instance);

					// Return this request.
					callback();
				}
			});
		} else {
			callback();
		}
	});
};
