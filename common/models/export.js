var moment = require('moment');
var CSVExport = require('../../services/csvexport.js');
var fs = require('fs');

module.exports = function(Export) {
	Export.disableRemoteMethodByName('updateById');

	// Setup a remote method to access CSV files.
	Export.download = function(id, cb) {
		// Get details about the Export provided.
		Export.findById(id, function(error, exportInstance) {
			if (error || !exportInstance) {
				cb('Invalid export ID.');
			} else {
				// Stream the file to the user.
				fs.readFile(CSVExport.getFullFilename(exportInstance), function(err, stream) {
	      			if (err) return cb(err);
	      			// stream can be any of: string, buffer, ReadableStream (e.g. http.IncomingMessage)
	      			cb(null, stream, 'application/octet-stream');
	    		});
			}
		});
	  };
	 
	Export.remoteMethod('download', {
	    isStatic: true,
	    http: {path: '/:id/download/:fileName', verb: 'get'},
	    accepts: [
	    	{arg: 'id', type: 'string', required: true}
	    ],
	    returns: [
	      { arg: 'body', type: 'file', root: true },
	      { arg: 'Content-Type', type: 'string', http: { target: 'header' } },
	    ],
	});

	// Processes a delete of an export by deleting the exported file (if it exists).
	Export.processDelete = function(exportInstance) {
		var fileToDelete = CSVExport.getFullFilename(exportInstance);
		if (fs.existsSync(fileToDelete)) {
			fs.unlinkSync(fileToDelete);
		}
	};

	Export.observe('before delete', function(context, callback) {
		if (context.instance) {
			// If deleting a single Export.
			Export.processDelete(context.instance);
			callback();
		} else { // If deleting many Export's.
			// Get all of the items being deleted.
			Export.find({where : context.where}, function(error, exports) {
				if (error || !exports) {
					callback('Could not get exports that need deleting.');
				} else {
					// Delete all the files.
					exports.forEach(Export.processDelete);
					callback();
				}
			});
		}
	});

	// Start CSV generation after save and when the status is pending.
	Export.observe('after save', function(context, callback) {
		if (context.instance.status === 'pending') {
			// Start the job running.
				// TODO: Switch to a cron job based method or some other event in response (for better scalability)
				// TODO: Support resuming a job if it crashes?
			CSVExport.generateCSV(context.instance);
		}
		callback();
	});

	// Process an Export before save so data is saved.
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
			Building.findById(buildingId, function(error, building) {
				if (error || !building) {
					context('Failed to get the building.');
				} else {
					var currentTime = Math.round(new Date().getTime()/1000);
					var fileName = 'Export_' + building.name + '_Generated' +
						moment.unix(currentTime).format('DD-MM-YY') + '.csv';

					// Set the started timestamp.
					context.instance.started = currentTime;

					// Fill in initial status.
					context.instance.status = 'pending';

					// Return this request.
					callback();
				}
			});
		} else {
			callback();
		}
	});
};
