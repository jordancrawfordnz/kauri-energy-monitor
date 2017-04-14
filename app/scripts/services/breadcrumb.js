'use strict';

var app = angular.module('kauriApp');
    
// A single Breadcrumb object.
app.factory('Breadcrumb', function($rootScope) {
    var Breadcrumb = function(name, path, description) {
        this.name = name;
        this.path = path;
        this.description = description;
    };

    return Breadcrumb;
});
