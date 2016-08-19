'use strict';

var app = angular.module('offgridmonitoringApp');
    
// Provides functions that help with the generation of charts.
app.factory('ChartHelper', function(ChartColours, $rootScope) {
   	var ChartHelper = {};

    // Gets the time offset since midnight.
    ChartHelper.getAmountOutFromMidnight = function(timestamp, reverseOrder) {
      var offset = (timestamp - 60*60*12 - 1) % (60*60*24); // match on midday GMT which is midnight in +12 NZ.
      if (reverseOrder) {
        offset = (60*60*24) - offset;
      }
      return offset;
    };

    // Gets the timestamp of the last midnight.
    ChartHelper.getLastMidnightTimestamp = function(timestamp, reverseOrder) {
      var outBy = ChartHelper.getAmountOutFromMidnight(timestamp, reverseOrder);
      if (reverseOrder){
        return timestamp + outBy; 
      } else {
        return timestamp - outBy;
      }
    };

    // Returns true if the end of the day has been missed.
    ChartHelper.hasMissedEndOfDay = function(timeSinceLastReading, currentTimestamp, reverseOrder) {
      var outBy = ChartHelper.getAmountOutFromMidnight(currentTimestamp, reverseOrder);
      // Either the timestamp is perfectly on midnight or midnight was missed.
      return outBy < timeSinceLastReading;    
    };

    // Gets the dataset parameter options for an energy source.
    ChartHelper.getEnergySourceDatasetTemplate = function(label, colourKey) {
      return $.extend({
        label: label,
        fill: true,
        pointRadius: 0,
        pointHitRadius: 4,
        lineTension: 0.1
      }, ChartColours.getChartColourFields(colourKey));
    };

    // Gets the callback options for a chart showing Wh sources.
    ChartHelper.getEnergySourceChartCallbacks = function() {
      return {
        title : function(tooltips, data) {
          return moment.unix(tooltips[0].xLabel).format($rootScope.dateTimeFormat);
        },
        label : function(tooltipItem, data) {
          var label = data.datasets[tooltipItem.datasetIndex].label;
          var value = Math.abs(tooltipItem.yLabel).toFixed(0) + 'Wh'; 
          return label + ': ' + value;
        }
      };
    };

    // Returns an object of: {order : [], sources : []}.
    ChartHelper.getEnergySourceDetails = function(building) {
      // Setup the known sources.
      var renewableEnergySources = {
        other : {
          data : [],
          label: building.otherEnergySourceName,
          colour: building.otherGenerationColour,
          isRenewable: true
        }
      };
      var renewableSourceOrder = [renewableEnergySources.other];
      
      var nonRenewableEnergySources = {
        charger : {
          data : [],
          label: building.chargerEnergySourceName,
          colour: building.chargerGenerationColour
        }
      };
      var nonRenewableSourceOrder = [nonRenewableEnergySources.charger];

      // Setup the remaining energy sources,
      angular.forEach(building.energySources, function(source) {
        renewableEnergySources[source.id] = {
          data : [],
          label: source.name,
          colour: source.chartColour,
          isRenewable: true
        };
        renewableSourceOrder.unshift(renewableEnergySources[source.id]); // Make this source to go the front.
      });

      // Join the sources together.
      var allEnergySources = $.extend({}, renewableEnergySources, nonRenewableEnergySources);
      var allSourceOrder = $.merge($.merge([], nonRenewableSourceOrder), renewableSourceOrder);
      
      return {
        order : allSourceOrder,
        sources : allEnergySources
      };
    };

    return ChartHelper;
});
