var fs = require('fs');

module.exports = function setupExports(server) {
	if (!fs.existsSync('exports')){
	    fs.mkdirSync('exports');
	}
};