var csvWriter = require('csv-write-stream');
var app = require('../server/server');
var Promise = require('promise');
var fs = require('fs');
var moment = require('moment');

var CSVExport = {};
module.exports = CSVExport;

CSVExport.getFullFilename = function(exportJob) {
	return 'exports/' + exportJob.id;
};

CSVExport.generateCSV = function(exportJob) {
	var Reading = app.models.Reading;
	var Building = app.models.Building;
	
	var after = exportJob.after;
	var until = exportJob.until;
	Building.findById(exportJob.buildingId, {include : {bridges : 'sensors'} },
	 function(error, building) {
	 	if (error || !building) {
	 		exportJob.updateAttribute('status', 'error');
	 	} else {
	 		building = building.toJSON();
	 		
	 		exportJob.updateAttribute('status', 'inprogress');
	 		
	 		// Discover all sensors.
	 		var sensors = [];
	 		building.bridges.forEach(function(bridge) {
	 			sensors = sensors.concat(bridge.sensors);
	 		});

	 		// Headers maps the header ID to the actual header name.
	 		var headers = {
	 			date : 'Date',
	 			bridgeId : 'Bridge ID'
	 		};

	 		sensors.forEach(function(sensor) {
	 			headers[sensor.id] = sensor.name + ' (type: ' + sensor.type + ', ID: ' + sensor.id + ')';
	 		});

	 		// Get the actual headers.
	 		var headerArray = Object.keys(headers).map(function (key) {return headers[key]});

	 		var writer = csvWriter({
	 			headers: headerArray
	 		});

	 		// Setup the CSV file.
	 		var fileName = CSVExport.getFullFilename(exportJob);
	 		writer.pipe(fs.createWriteStream(fileName));
			
	 		var allPromises = []; // stores all the promises we need to wait for.

			// Get all the readings for each bridge.
				// TODO: Paginate to reduce overall memory load?
			building.bridges.forEach(function(bridge) {
				var sensors = bridge.sensors;
				
				// Make the CSV write wait for this task.
				var promise = new Promise(function(resolve, reject) {
					// Find all the readings for this bridge.
					var filter = {
						where: { and : [
							{ bridgeId : bridge.id }
						]},
						order: 'timestamp asc'
					};

					// If an after date is defined, get only values greater than this date.
					if (after) {
						filter.where.and.push({
							timestamp : {gt : after}
						});
					}

					// If a until date is defined, get only values before this date.
					if (until) {
						filter.where.and.push({
							timestamp : {lt : until}
						});
					}

					Reading.find(filter, function(error, readings) {
						if (!error) {
							readings.forEach(function(reading) {
								var csvEntry = {};
								csvEntry[headers.date] = moment.unix(reading.timestamp).format('YYYY-MM-DD HH:mm:ss');
								csvEntry[headers.bridgeId] = reading.bridgeId;
								
								Object.keys(reading.values).forEach(function(key) {
									var value = reading.values[key];
									// Write the value to the CSV under the heading for this sensor.
									csvEntry[headers[key]] = value;
								});
								writer.write(csvEntry); // write the entry.
							});
							resolve();
						} else {
							reject(error);
						}
					});
				});
				allPromises.push(promise);
			});

			Promise.all(allPromises).then(function() {
				// On successful end.
				writer.end();
				exportJob.updateAttributes({status: 'finished', finished: Math.round(new Date().getTime()/1000)});
			}, function(errors) {
				writer.end();
				exportJob.updateAttribute('status', 'error');
			});
	 	}
	});
};
