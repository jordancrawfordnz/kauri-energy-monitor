module.exports = function clearGeneratingBuildings(server) {
  	var Building = server.models.Building;

  	// Gets buildings that have 'statesAreRegenerating' set.
  	Building.find({
  		where : {
  			statesAreRegenerating : true
  		}
  	}, function(getBuildingsError, buildingsRegeneratingStates) {
  		// Clears the 'statesAreRegenerating' flag from all buildings with this set - this is no longer processing!
  		buildingsRegeneratingStates.forEach(function(building) {
  			console.log('Clearing the building "' + building.name + '" (' + building.id + ') of its "statesAreRegenerating" flag.');
  			building.updateAttribute('statesAreRegenerating', false); // doesn't wait for these to finish.
  		});
  	});
};
