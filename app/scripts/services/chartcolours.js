'use strict';

var app = angular.module('offgridmonitoringApp');
    
// Maintains the set of avaliable colours and turns them into real colours.
app.factory('ChartColours', function() {
    var ChartColours = {};
    
    ChartColours.colours = {
        red : {
            name : 'Renewable Red',
            colour : 'FA4700'
        },
        black : {
            name : 'Coal Burning Black',
            colour : '4D4D4D'
        },
        yellow : {
            name : 'Sunshine Yellow',
            colour : 'FAE500'
        },
        blue : {
            name : 'Hydro Blue',
            colour : '0085FA'
        },
        green : {
            name : 'Eco Green',
            colour : '00FA43'
        }
    };

    // Gets the colour code for a colour.
    ChartColours.getColour = function(key) {
        return ChartColours.colours[key].colour;
    };

    // Converts a hex colour like FFFFFF to an object with red, green and blue components.
    ChartColours.seperateHexColour = function(hex) {
      var asInteger = parseInt(hex, 16);
      return {
        red : (asInteger >> 16) & 255,
        green : (asInteger >> 8) & 255,
        blue : asInteger & 255
      };
    };

    // Converts a hex object of the red, green and blue components to a rgba string with some alpha level.
    ChartColours.hexColourToRGBA = function(hexColour, alphaLevel) {
      return 'rgba(' + hexColour.red + ', ' + hexColour.green + ', ' + hexColour.blue + ', ' + alphaLevel + ')';
    };

    // Returns colour fields for a chart based on the colours key.
    ChartColours.getChartColourFields = function(colourKey) {
        var colourToUse = ChartColours.seperateHexColour(ChartColours.getColour(colourKey));
        var colourFields = {
            borderColor: ChartColours.hexColourToRGBA(colourToUse, 1),
            pointHoverBorderColor: ChartColours.hexColourToRGBA(colourToUse, 1),
            pointHoverBackgroundColor: ChartColours.hexColourToRGBA(colourToUse, 1),
            backgroundColor: ChartColours.hexColourToRGBA(colourToUse, 0.5)
        };
        return colourFields;
    };

    return ChartColours;
});
