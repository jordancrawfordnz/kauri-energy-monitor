'use strict';

var app = angular.module('offgridmonitoringApp');
    
//  Maintains the set of breadcrumbs.
app.factory('Breadcrumbs', function($rootScope) {
    var Breadcrumbs = {};

    Breadcrumbs.reset = function() {
        Breadcrumbs.crumbs.splice(1, Breadcrumbs.crumbs.length - 1);  
    };

    Breadcrumbs.add = function(breadcrumb) {
      console.log('add bc');
      console.log(breadcrumb);
      Breadcrumbs.crumbs.push(breadcrumb);
      return breadcrumb;
    };

    Breadcrumbs.addAll = function(breadcrumbs) {
      //Breadcrumbs.crums
    };

    Breadcrumbs.crumbs = [];

    // Reset breadcrumbs when the page changes.
    // $rootScope.$on('$routeChangeStart', function() {
    //     console.log('route change');
    //     Breadcrumbs.reset();
    // });

    return Breadcrumbs;
});
