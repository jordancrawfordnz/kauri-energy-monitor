'use strict';

var app = angular.module('offgridmonitoringApp');
    
//  Maintains the set of breadcrumbs.
app.factory('Breadcrumbs', function($rootScope) {
    var Breadcrumbs = {};

    // Reset all breadcrumbs.
    Breadcrumbs.reset = function() {
        Breadcrumbs.crumbs.splice(1, Breadcrumbs.crumbs.length - 1);  
    };

    // Adds a single breadcrumb to the active crumbs.
    Breadcrumbs.add = function(breadcrumb) {
      Breadcrumbs.crumbs.push(breadcrumb);
      return breadcrumb;
    };

    // Adds an array of breadcrumbs to the active crumbs.
    Breadcrumbs.addAll = function(breadcrumbs) {
      Breadcrumbs.crumbs = $.merge(Breadcrumbs.crumbs, breadcrumbs);
    };

    Breadcrumbs.crumbs = [];

    // Reset breadcrumbs when the page changes.
    $rootScope.$on('$routeChangeStart', function() {
        Breadcrumbs.reset();
    });

    return Breadcrumbs;
});
