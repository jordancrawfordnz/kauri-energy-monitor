module.exports = function(Building) {
	Building.csv = function(cb) {
		cb(null, {test:'something'});
	};

	Building.remoteMethod('csv', {
		http: {verb: 'get'},
		returns: {root: true, type: 'object'}
	});
};
