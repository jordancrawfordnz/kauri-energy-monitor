'use strict';

var app = angular.module('offgridmonitoringApp');
    
// Metadata on the types of sensors.
app.factory('SensorTypes', function() {
    return {
      "acvoltage" : {
        electricity : "AC",
        type : "Voltage",
        unitFull : "Volts",
        unitShort : "V",
        isAC : true
      },
      "dcvoltage" : {
        electricity : "DC",
        type : "Voltage",
        unitFull : "Volts",
        unitShort : "V"
      },
      "accurrent" : {
        electricity : "AC",
        type : "Current",
        unitFull : "Amps",
        unitShort : "A",
        isAC : true
      },
      "dccurrent" : {
        electricity : "DC",
        type : "Current",
        unitFull : "Amps",
        unitShort : "A"
      },
      "acpower" : {
        electricity : "AC",
        type : "Power",
        unitFull : "Watts",
        unitShort : "W",
        isAC : true
      }
    };
});
