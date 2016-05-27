'use strict';

var app = angular.module('offgridmonitoringApp');
    
//  Maintains the set of breadcrumbs.
app.factory('Breadcrumbs', function($rootScope, Breadcrumb) {
    var Breadcrumbs = {};

    // Reset all breadcrumbs.
    Breadcrumbs.reset = function() {
        Breadcrumbs.crumbs.splice(0, Breadcrumbs.crumbs.length);  
    };

    // Adds a single breadcrumb to the active crumbs.
    Breadcrumbs.add = function(breadcrumb) {
      Breadcrumbs.crumbs.push(breadcrumb);
      return breadcrumb;
    };

    // Adds a placeholder breadcrumb. When the provided promise expires, the provided callback function will be called.
    // The callback function is called with the promise result and must return a Building object.
    // The placeholder name will be used until the promise resolves.
    Breadcrumbs.addPlaceholder = function(placeholderName, promiseToWaitFor, callback) {
        var placeholder = Breadcrumbs.add(new Breadcrumb(placeholderName));
        promiseToWaitFor.then(function(data) {
            var breadcrumb = callback(data); // get data from the callback.
            if (!breadcrumb) {
                return; // don't set the breadcrumb if nothing returned.
            }
            // Replace the placeholder with the actual breadcrumb.
            var placeholderIndex = Breadcrumbs.crumbs.indexOf(placeholder);
            if (placeholderIndex !== -1) { // if placeholder still present.
                Breadcrumbs.crumbs[placeholderIndex] = breadcrumb;
            }
        });
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
