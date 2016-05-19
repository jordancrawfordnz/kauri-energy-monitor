var csvWriter = require('csv-write-stream');
var fs = require('fs');
var app = require('../../server/server');
var Promise = require('promise');
var moment = require('moment');

module.exports = function(Building) {
	
	Building.observe('loaded', function(ctx, next) {
		var Reading = app.models.Reading;
		var Bridge = app.models.Bridge;

		Building.csv = function(id, cb) {
			Building.findById(id, {include : {bridges : 'sensors'} },
			 function(error, building) {
			 	if (error || !building) {
			 		cb('Building not found.');
			 	} else {
			 		building = building.toJSON();
			 		
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
			 		writer.pipe(fs.createWriteStream('out.csv'))
					
			 		var allPromises = []; // stores all the promises we need to wait for.

					// Get all the readings for each bridge.
						// TODO: Paginate to reduce overall memory load?
					building.bridges.forEach(function(bridge) {
						var sensors = bridge.sensors;
						
						// Make the CSV write wait for this task.
						var promise = new Promise(function(resolve, reject) {
							// Find all the readings for this bridge.
							Reading.find({
								where: {bridgeId : bridge.id}
							}, function(error, readings) {
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
						cb(null, {test:'something'});
					}, function(errors) {
						writer.end();
						cb('Error occured while fetching data.');
					});
			 	}
			});
		};
		next();
	});

	Building.remoteMethod('csv', {
		http: {verb: 'get', path: '/:id/csv'},
		accepts: [
			{ arg: 'id', type: 'string', required: true }
		],
		returns: {root: true, type: 'object'}
	});
};
