// CommonJS package manager support
if (typeof module !== 'undefined' && typeof exports !== 'undefined' && module.exports === exports) {
  // Export the *name* of this Angular module
  // Sample usage:
  //
  //   import lbServices from './lb-services';
  //   angular.module('app', [lbServices]);
  //
  module.exports = "lbServices";
}

(function(window, angular, undefined) {'use strict';

var urlBase = "/api";
var authHeader = 'authorization';

function getHost(url) {
  var m = url.match(/^(?:https?:)?\/\/([^\/]+)/);
  return m ? m[1] : null;
}

var urlBaseHost = getHost(urlBase) || location.host;

/**
 * @ngdoc overview
 * @name lbServices
 * @module
 * @description
 *
 * The `lbServices` module provides services for interacting with
 * the models exposed by the LoopBack server via the REST API.
 *
 */
var module = angular.module("lbServices", ['ngResource']);

/**
 * @ngdoc object
 * @name lbServices.Building
 * @header lbServices.Building
 * @object
 *
 * @description
 *
 * A $resource object for interacting with the `Building` model.
 *
 * ## Example
 *
 * See
 * {@link http://docs.angularjs.org/api/ngResource.$resource#example $resource}
 * for an example of using this object.
 *
 */
module.factory(
  "Building",
  ['LoopBackResource', 'LoopBackAuth', '$injector', function(Resource, LoopBackAuth, $injector) {
    var R = Resource(
      urlBase + "/Buildings/:id",
      { 'id': '@id' },
      {

        // INTERNAL. Use Building.bridges.findById() instead.
        "prototype$__findById__bridges": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/Buildings/:id/bridges/:fk",
          method: "GET"
        },

        // INTERNAL. Use Building.bridges.destroyById() instead.
        "prototype$__destroyById__bridges": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/Buildings/:id/bridges/:fk",
          method: "DELETE"
        },

        // INTERNAL. Use Building.bridges.updateById() instead.
        "prototype$__updateById__bridges": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/Buildings/:id/bridges/:fk",
          method: "PUT"
        },

        // INTERNAL. Use Building.batteryVoltageSensor() instead.
        "prototype$__get__batteryVoltageSensor": {
          url: urlBase + "/Buildings/:id/batteryVoltageSensor",
          method: "GET"
        },

        // INTERNAL. Use Building.batteryCurrentSensor() instead.
        "prototype$__get__batteryCurrentSensor": {
          url: urlBase + "/Buildings/:id/batteryCurrentSensor",
          method: "GET"
        },

        // INTERNAL. Use Building.buildingPowerSensor() instead.
        "prototype$__get__buildingPowerSensor": {
          url: urlBase + "/Buildings/:id/buildingPowerSensor",
          method: "GET"
        },

        // INTERNAL. Use Building.loadCurrentSensor() instead.
        "prototype$__get__loadCurrentSensor": {
          url: urlBase + "/Buildings/:id/loadCurrentSensor",
          method: "GET"
        },

        // INTERNAL. Use Building.people.findById() instead.
        "prototype$__findById__people": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/Buildings/:id/people/:fk",
          method: "GET"
        },

        // INTERNAL. Use Building.people.destroyById() instead.
        "prototype$__destroyById__people": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/Buildings/:id/people/:fk",
          method: "DELETE"
        },

        // INTERNAL. Use Building.people.updateById() instead.
        "prototype$__updateById__people": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/Buildings/:id/people/:fk",
          method: "PUT"
        },

        // INTERNAL. Use Building.people.link() instead.
        "prototype$__link__people": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/Buildings/:id/people/rel/:fk",
          method: "PUT"
        },

        // INTERNAL. Use Building.people.unlink() instead.
        "prototype$__unlink__people": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/Buildings/:id/people/rel/:fk",
          method: "DELETE"
        },

        // INTERNAL. Use Building.people.exists() instead.
        "prototype$__exists__people": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/Buildings/:id/people/rel/:fk",
          method: "HEAD"
        },

        // INTERNAL. Use Building.exports.findById() instead.
        "prototype$__findById__exports": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/Buildings/:id/exports/:fk",
          method: "GET"
        },

        // INTERNAL. Use Building.exports.destroyById() instead.
        "prototype$__destroyById__exports": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/Buildings/:id/exports/:fk",
          method: "DELETE"
        },

        // INTERNAL. Use Building.states.findById() instead.
        "prototype$__findById__states": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/Buildings/:id/states/:fk",
          method: "GET"
        },

        // INTERNAL. Use Building.states.destroyById() instead.
        "prototype$__destroyById__states": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/Buildings/:id/states/:fk",
          method: "DELETE"
        },

        // INTERNAL. Use Building.states.updateById() instead.
        "prototype$__updateById__states": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/Buildings/:id/states/:fk",
          method: "PUT"
        },

        // INTERNAL. Use Building.currentState() instead.
        "prototype$__get__currentState": {
          url: urlBase + "/Buildings/:id/currentState",
          method: "GET"
        },

        // INTERNAL. Use Building.recalibrations.findById() instead.
        "prototype$__findById__recalibrations": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/Buildings/:id/recalibrations/:fk",
          method: "GET"
        },

        // INTERNAL. Use Building.recalibrations.destroyById() instead.
        "prototype$__destroyById__recalibrations": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/Buildings/:id/recalibrations/:fk",
          method: "DELETE"
        },

        // INTERNAL. Use Building.recalibrations.updateById() instead.
        "prototype$__updateById__recalibrations": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/Buildings/:id/recalibrations/:fk",
          method: "PUT"
        },

        // INTERNAL. Use Building.energySources.findById() instead.
        "prototype$__findById__energySources": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/Buildings/:id/energySources/:fk",
          method: "GET"
        },

        // INTERNAL. Use Building.energySources.destroyById() instead.
        "prototype$__destroyById__energySources": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/Buildings/:id/energySources/:fk",
          method: "DELETE"
        },

        // INTERNAL. Use Building.energySources.updateById() instead.
        "prototype$__updateById__energySources": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/Buildings/:id/energySources/:fk",
          method: "PUT"
        },

        // INTERNAL. Use Building.bridges() instead.
        "prototype$__get__bridges": {
          isArray: true,
          url: urlBase + "/Buildings/:id/bridges",
          method: "GET"
        },

        // INTERNAL. Use Building.bridges.create() instead.
        "prototype$__create__bridges": {
          url: urlBase + "/Buildings/:id/bridges",
          method: "POST"
        },

        // INTERNAL. Use Building.bridges.destroyAll() instead.
        "prototype$__delete__bridges": {
          url: urlBase + "/Buildings/:id/bridges",
          method: "DELETE"
        },

        // INTERNAL. Use Building.bridges.count() instead.
        "prototype$__count__bridges": {
          url: urlBase + "/Buildings/:id/bridges/count",
          method: "GET"
        },

        // INTERNAL. Use Building.people() instead.
        "prototype$__get__people": {
          isArray: true,
          url: urlBase + "/Buildings/:id/people",
          method: "GET"
        },

        // INTERNAL. Use Building.people.create() instead.
        "prototype$__create__people": {
          url: urlBase + "/Buildings/:id/people",
          method: "POST"
        },

        // INTERNAL. Use Building.people.destroyAll() instead.
        "prototype$__delete__people": {
          url: urlBase + "/Buildings/:id/people",
          method: "DELETE"
        },

        // INTERNAL. Use Building.people.count() instead.
        "prototype$__count__people": {
          url: urlBase + "/Buildings/:id/people/count",
          method: "GET"
        },

        // INTERNAL. Use Building.exports() instead.
        "prototype$__get__exports": {
          isArray: true,
          url: urlBase + "/Buildings/:id/exports",
          method: "GET"
        },

        // INTERNAL. Use Building.exports.create() instead.
        "prototype$__create__exports": {
          url: urlBase + "/Buildings/:id/exports",
          method: "POST"
        },

        // INTERNAL. Use Building.exports.destroyAll() instead.
        "prototype$__delete__exports": {
          url: urlBase + "/Buildings/:id/exports",
          method: "DELETE"
        },

        // INTERNAL. Use Building.exports.count() instead.
        "prototype$__count__exports": {
          url: urlBase + "/Buildings/:id/exports/count",
          method: "GET"
        },

        // INTERNAL. Use Building.states() instead.
        "prototype$__get__states": {
          isArray: true,
          url: urlBase + "/Buildings/:id/states",
          method: "GET"
        },

        // INTERNAL. Use Building.states.create() instead.
        "prototype$__create__states": {
          url: urlBase + "/Buildings/:id/states",
          method: "POST"
        },

        // INTERNAL. Use Building.states.destroyAll() instead.
        "prototype$__delete__states": {
          url: urlBase + "/Buildings/:id/states",
          method: "DELETE"
        },

        // INTERNAL. Use Building.states.count() instead.
        "prototype$__count__states": {
          url: urlBase + "/Buildings/:id/states/count",
          method: "GET"
        },

        // INTERNAL. Use Building.recalibrations() instead.
        "prototype$__get__recalibrations": {
          isArray: true,
          url: urlBase + "/Buildings/:id/recalibrations",
          method: "GET"
        },

        // INTERNAL. Use Building.recalibrations.create() instead.
        "prototype$__create__recalibrations": {
          url: urlBase + "/Buildings/:id/recalibrations",
          method: "POST"
        },

        // INTERNAL. Use Building.recalibrations.destroyAll() instead.
        "prototype$__delete__recalibrations": {
          url: urlBase + "/Buildings/:id/recalibrations",
          method: "DELETE"
        },

        // INTERNAL. Use Building.recalibrations.count() instead.
        "prototype$__count__recalibrations": {
          url: urlBase + "/Buildings/:id/recalibrations/count",
          method: "GET"
        },

        // INTERNAL. Use Building.energySources() instead.
        "prototype$__get__energySources": {
          isArray: true,
          url: urlBase + "/Buildings/:id/energySources",
          method: "GET"
        },

        // INTERNAL. Use Building.energySources.create() instead.
        "prototype$__create__energySources": {
          url: urlBase + "/Buildings/:id/energySources",
          method: "POST"
        },

        // INTERNAL. Use Building.energySources.destroyAll() instead.
        "prototype$__delete__energySources": {
          url: urlBase + "/Buildings/:id/energySources",
          method: "DELETE"
        },

        // INTERNAL. Use Building.energySources.count() instead.
        "prototype$__count__energySources": {
          url: urlBase + "/Buildings/:id/energySources/count",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Building#create
         * @methodOf lbServices.Building
         *
         * @description
         *
         * Create a new instance of the model and persist it into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Building` object.)
         * </em>
         */
        "create": {
          url: urlBase + "/Buildings",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.Building#createMany
         * @methodOf lbServices.Building
         *
         * @description
         *
         * Create a new instance of the model and persist it into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Building` object.)
         * </em>
         */
        "createMany": {
          isArray: true,
          url: urlBase + "/Buildings",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.Building#upsert
         * @methodOf lbServices.Building
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Building` object.)
         * </em>
         */
        "upsert": {
          url: urlBase + "/Buildings",
          method: "PUT"
        },

        /**
         * @ngdoc method
         * @name lbServices.Building#exists
         * @methodOf lbServices.Building
         *
         * @description
         *
         * Check whether a model instance exists in the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `exists` – `{boolean=}` - 
         */
        "exists": {
          url: urlBase + "/Buildings/:id/exists",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Building#findById
         * @methodOf lbServices.Building
         *
         * @description
         *
         * Find a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         *  - `filter` – `{object=}` - Filter defining fields and include
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Building` object.)
         * </em>
         */
        "findById": {
          url: urlBase + "/Buildings/:id",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Building#find
         * @methodOf lbServices.Building
         *
         * @description
         *
         * Find all instances of the model matched by filter from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, include, order, offset, and limit
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Building` object.)
         * </em>
         */
        "find": {
          isArray: true,
          url: urlBase + "/Buildings",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Building#findOne
         * @methodOf lbServices.Building
         *
         * @description
         *
         * Find first instance of the model matched by filter from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, include, order, offset, and limit
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Building` object.)
         * </em>
         */
        "findOne": {
          url: urlBase + "/Buildings/findOne",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Building#updateAll
         * @methodOf lbServices.Building
         *
         * @description
         *
         * Update instances of the model matched by where from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * The number of instances updated
         */
        "updateAll": {
          url: urlBase + "/Buildings/update",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.Building#deleteById
         * @methodOf lbServices.Building
         *
         * @description
         *
         * Delete a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Building` object.)
         * </em>
         */
        "deleteById": {
          url: urlBase + "/Buildings/:id",
          method: "DELETE"
        },

        /**
         * @ngdoc method
         * @name lbServices.Building#count
         * @methodOf lbServices.Building
         *
         * @description
         *
         * Count instances of the model matched by where from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `count` – `{number=}` - 
         */
        "count": {
          url: urlBase + "/Buildings/count",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Building#prototype$updateAttributes
         * @methodOf lbServices.Building
         *
         * @description
         *
         * Update attributes for a model instance and persist it into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Building` object.)
         * </em>
         */
        "prototype$updateAttributes": {
          url: urlBase + "/Buildings/:id",
          method: "PUT"
        },

        /**
         * @ngdoc method
         * @name lbServices.Building#createChangeStream
         * @methodOf lbServices.Building
         *
         * @description
         *
         * Create a change stream.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         *  - `options` – `{object=}` - 
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `changes` – `{ReadableStream=}` - 
         */
        "createChangeStream": {
          url: urlBase + "/Buildings/change-stream",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.Building#regenerateState
         * @methodOf lbServices.Building
         *
         * @description
         *
         * <em>
         * (The remote method definition does not provide any description.)
         * </em>
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         *  - `id` – `{string}` - 
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Building` object.)
         * </em>
         */
        "regenerateState": {
          url: urlBase + "/Buildings/:id/regeneratestate",
          method: "POST"
        },

        // INTERNAL. Use Bridge.building() instead.
        "::get::Bridge::building": {
          url: urlBase + "/Bridges/:id/building",
          method: "GET"
        },

        // INTERNAL. Use People.buildings.findById() instead.
        "::findById::People::buildings": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/People/:id/buildings/:fk",
          method: "GET"
        },

        // INTERNAL. Use People.buildings.destroyById() instead.
        "::destroyById::People::buildings": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/People/:id/buildings/:fk",
          method: "DELETE"
        },

        // INTERNAL. Use People.buildings.updateById() instead.
        "::updateById::People::buildings": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/People/:id/buildings/:fk",
          method: "PUT"
        },

        // INTERNAL. Use People.buildings.link() instead.
        "::link::People::buildings": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/People/:id/buildings/rel/:fk",
          method: "PUT"
        },

        // INTERNAL. Use People.buildings.unlink() instead.
        "::unlink::People::buildings": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/People/:id/buildings/rel/:fk",
          method: "DELETE"
        },

        // INTERNAL. Use People.buildings.exists() instead.
        "::exists::People::buildings": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/People/:id/buildings/rel/:fk",
          method: "HEAD"
        },

        // INTERNAL. Use People.buildings() instead.
        "::get::People::buildings": {
          isArray: true,
          url: urlBase + "/People/:id/buildings",
          method: "GET"
        },

        // INTERNAL. Use People.buildings.create() instead.
        "::create::People::buildings": {
          url: urlBase + "/People/:id/buildings",
          method: "POST"
        },

        // INTERNAL. Use People.buildings.createMany() instead.
        "::createMany::People::buildings": {
          isArray: true,
          url: urlBase + "/People/:id/buildings",
          method: "POST"
        },

        // INTERNAL. Use People.buildings.destroyAll() instead.
        "::delete::People::buildings": {
          url: urlBase + "/People/:id/buildings",
          method: "DELETE"
        },

        // INTERNAL. Use People.buildings.count() instead.
        "::count::People::buildings": {
          url: urlBase + "/People/:id/buildings/count",
          method: "GET"
        },

        // INTERNAL. Use Export.building() instead.
        "::get::Export::building": {
          url: urlBase + "/Exports/:id/building",
          method: "GET"
        },

        // INTERNAL. Use State.building() instead.
        "::get::State::building": {
          url: urlBase + "/States/:id/building",
          method: "GET"
        },

        // INTERNAL. Use Recalibration.building() instead.
        "::get::Recalibration::building": {
          url: urlBase + "/Recalibrations/:id/building",
          method: "GET"
        },

        // INTERNAL. Use EnergySource.building() instead.
        "::get::EnergySource::building": {
          url: urlBase + "/EnergySources/:id/building",
          method: "GET"
        },
      }
    );



        /**
         * @ngdoc method
         * @name lbServices.Building#updateOrCreate
         * @methodOf lbServices.Building
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Building` object.)
         * </em>
         */
        R["updateOrCreate"] = R["upsert"];

        /**
         * @ngdoc method
         * @name lbServices.Building#update
         * @methodOf lbServices.Building
         *
         * @description
         *
         * Update instances of the model matched by where from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * The number of instances updated
         */
        R["update"] = R["updateAll"];

        /**
         * @ngdoc method
         * @name lbServices.Building#destroyById
         * @methodOf lbServices.Building
         *
         * @description
         *
         * Delete a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Building` object.)
         * </em>
         */
        R["destroyById"] = R["deleteById"];

        /**
         * @ngdoc method
         * @name lbServices.Building#removeById
         * @methodOf lbServices.Building
         *
         * @description
         *
         * Delete a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Building` object.)
         * </em>
         */
        R["removeById"] = R["deleteById"];


    /**
    * @ngdoc property
    * @name lbServices.Building#modelName
    * @propertyOf lbServices.Building
    * @description
    * The name of the model represented by this $resource,
    * i.e. `Building`.
    */
    R.modelName = "Building";

    /**
     * @ngdoc object
     * @name lbServices.Building.bridges
     * @header lbServices.Building.bridges
     * @object
     * @description
     *
     * The object `Building.bridges` groups methods
     * manipulating `Bridge` instances related to `Building`.
     *
     * Call {@link lbServices.Building#bridges Building.bridges()}
     * to query all related instances.
     */


        /**
         * @ngdoc method
         * @name lbServices.Building#bridges
         * @methodOf lbServices.Building
         *
         * @description
         *
         * Queries bridges of Building.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `filter` – `{object=}` - 
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Bridge` object.)
         * </em>
         */
        R.bridges = function() {
          var TargetResource = $injector.get("Bridge");
          var action = TargetResource["::get::Building::bridges"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Building.bridges#count
         * @methodOf lbServices.Building.bridges
         *
         * @description
         *
         * Counts bridges of Building.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `count` – `{number=}` - 
         */
        R.bridges.count = function() {
          var TargetResource = $injector.get("Bridge");
          var action = TargetResource["::count::Building::bridges"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Building.bridges#create
         * @methodOf lbServices.Building.bridges
         *
         * @description
         *
         * Creates a new instance in bridges of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Bridge` object.)
         * </em>
         */
        R.bridges.create = function() {
          var TargetResource = $injector.get("Bridge");
          var action = TargetResource["::create::Building::bridges"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Building.bridges#createMany
         * @methodOf lbServices.Building.bridges
         *
         * @description
         *
         * Creates a new instance in bridges of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Bridge` object.)
         * </em>
         */
        R.bridges.createMany = function() {
          var TargetResource = $injector.get("Bridge");
          var action = TargetResource["::createMany::Building::bridges"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Building.bridges#destroyAll
         * @methodOf lbServices.Building.bridges
         *
         * @description
         *
         * Deletes all bridges of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R.bridges.destroyAll = function() {
          var TargetResource = $injector.get("Bridge");
          var action = TargetResource["::delete::Building::bridges"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Building.bridges#destroyById
         * @methodOf lbServices.Building.bridges
         *
         * @description
         *
         * Delete a related item by id for bridges.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `fk` – `{*}` - Foreign key for bridges
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R.bridges.destroyById = function() {
          var TargetResource = $injector.get("Bridge");
          var action = TargetResource["::destroyById::Building::bridges"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Building.bridges#findById
         * @methodOf lbServices.Building.bridges
         *
         * @description
         *
         * Find a related item by id for bridges.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `fk` – `{*}` - Foreign key for bridges
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Bridge` object.)
         * </em>
         */
        R.bridges.findById = function() {
          var TargetResource = $injector.get("Bridge");
          var action = TargetResource["::findById::Building::bridges"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Building.bridges#updateById
         * @methodOf lbServices.Building.bridges
         *
         * @description
         *
         * Update a related item by id for bridges.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `fk` – `{*}` - Foreign key for bridges
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Bridge` object.)
         * </em>
         */
        R.bridges.updateById = function() {
          var TargetResource = $injector.get("Bridge");
          var action = TargetResource["::updateById::Building::bridges"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Building#batteryVoltageSensor
         * @methodOf lbServices.Building
         *
         * @description
         *
         * Fetches belongsTo relation batteryVoltageSensor.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `refresh` – `{boolean=}` - 
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Sensor` object.)
         * </em>
         */
        R.batteryVoltageSensor = function() {
          var TargetResource = $injector.get("Sensor");
          var action = TargetResource["::get::Building::batteryVoltageSensor"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Building#batteryCurrentSensor
         * @methodOf lbServices.Building
         *
         * @description
         *
         * Fetches belongsTo relation batteryCurrentSensor.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `refresh` – `{boolean=}` - 
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Sensor` object.)
         * </em>
         */
        R.batteryCurrentSensor = function() {
          var TargetResource = $injector.get("Sensor");
          var action = TargetResource["::get::Building::batteryCurrentSensor"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Building#buildingPowerSensor
         * @methodOf lbServices.Building
         *
         * @description
         *
         * Fetches belongsTo relation buildingPowerSensor.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `refresh` – `{boolean=}` - 
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Sensor` object.)
         * </em>
         */
        R.buildingPowerSensor = function() {
          var TargetResource = $injector.get("Sensor");
          var action = TargetResource["::get::Building::buildingPowerSensor"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Building#loadCurrentSensor
         * @methodOf lbServices.Building
         *
         * @description
         *
         * Fetches belongsTo relation loadCurrentSensor.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `refresh` – `{boolean=}` - 
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Sensor` object.)
         * </em>
         */
        R.loadCurrentSensor = function() {
          var TargetResource = $injector.get("Sensor");
          var action = TargetResource["::get::Building::loadCurrentSensor"];
          return action.apply(R, arguments);
        };
    /**
     * @ngdoc object
     * @name lbServices.Building.people
     * @header lbServices.Building.people
     * @object
     * @description
     *
     * The object `Building.people` groups methods
     * manipulating `People` instances related to `Building`.
     *
     * Call {@link lbServices.Building#people Building.people()}
     * to query all related instances.
     */


        /**
         * @ngdoc method
         * @name lbServices.Building#people
         * @methodOf lbServices.Building
         *
         * @description
         *
         * Queries people of Building.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `filter` – `{object=}` - 
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `People` object.)
         * </em>
         */
        R.people = function() {
          var TargetResource = $injector.get("People");
          var action = TargetResource["::get::Building::people"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Building.people#count
         * @methodOf lbServices.Building.people
         *
         * @description
         *
         * Counts people of Building.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `count` – `{number=}` - 
         */
        R.people.count = function() {
          var TargetResource = $injector.get("People");
          var action = TargetResource["::count::Building::people"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Building.people#create
         * @methodOf lbServices.Building.people
         *
         * @description
         *
         * Creates a new instance in people of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `People` object.)
         * </em>
         */
        R.people.create = function() {
          var TargetResource = $injector.get("People");
          var action = TargetResource["::create::Building::people"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Building.people#createMany
         * @methodOf lbServices.Building.people
         *
         * @description
         *
         * Creates a new instance in people of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `People` object.)
         * </em>
         */
        R.people.createMany = function() {
          var TargetResource = $injector.get("People");
          var action = TargetResource["::createMany::Building::people"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Building.people#destroyAll
         * @methodOf lbServices.Building.people
         *
         * @description
         *
         * Deletes all people of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R.people.destroyAll = function() {
          var TargetResource = $injector.get("People");
          var action = TargetResource["::delete::Building::people"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Building.people#destroyById
         * @methodOf lbServices.Building.people
         *
         * @description
         *
         * Delete a related item by id for people.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `fk` – `{*}` - Foreign key for people
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R.people.destroyById = function() {
          var TargetResource = $injector.get("People");
          var action = TargetResource["::destroyById::Building::people"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Building.people#exists
         * @methodOf lbServices.Building.people
         *
         * @description
         *
         * Check the existence of people relation to an item by id.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `fk` – `{*}` - Foreign key for people
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `People` object.)
         * </em>
         */
        R.people.exists = function() {
          var TargetResource = $injector.get("People");
          var action = TargetResource["::exists::Building::people"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Building.people#findById
         * @methodOf lbServices.Building.people
         *
         * @description
         *
         * Find a related item by id for people.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `fk` – `{*}` - Foreign key for people
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `People` object.)
         * </em>
         */
        R.people.findById = function() {
          var TargetResource = $injector.get("People");
          var action = TargetResource["::findById::Building::people"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Building.people#link
         * @methodOf lbServices.Building.people
         *
         * @description
         *
         * Add a related item by id for people.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `fk` – `{*}` - Foreign key for people
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `People` object.)
         * </em>
         */
        R.people.link = function() {
          var TargetResource = $injector.get("People");
          var action = TargetResource["::link::Building::people"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Building.people#unlink
         * @methodOf lbServices.Building.people
         *
         * @description
         *
         * Remove the people relation to an item by id.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `fk` – `{*}` - Foreign key for people
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R.people.unlink = function() {
          var TargetResource = $injector.get("People");
          var action = TargetResource["::unlink::Building::people"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Building.people#updateById
         * @methodOf lbServices.Building.people
         *
         * @description
         *
         * Update a related item by id for people.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `fk` – `{*}` - Foreign key for people
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `People` object.)
         * </em>
         */
        R.people.updateById = function() {
          var TargetResource = $injector.get("People");
          var action = TargetResource["::updateById::Building::people"];
          return action.apply(R, arguments);
        };
    /**
     * @ngdoc object
     * @name lbServices.Building.exports
     * @header lbServices.Building.exports
     * @object
     * @description
     *
     * The object `Building.exports` groups methods
     * manipulating `Export` instances related to `Building`.
     *
     * Call {@link lbServices.Building#exports Building.exports()}
     * to query all related instances.
     */


        /**
         * @ngdoc method
         * @name lbServices.Building#exports
         * @methodOf lbServices.Building
         *
         * @description
         *
         * Queries exports of Building.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `filter` – `{object=}` - 
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Export` object.)
         * </em>
         */
        R.exports = function() {
          var TargetResource = $injector.get("Export");
          var action = TargetResource["::get::Building::exports"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Building.exports#count
         * @methodOf lbServices.Building.exports
         *
         * @description
         *
         * Counts exports of Building.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `count` – `{number=}` - 
         */
        R.exports.count = function() {
          var TargetResource = $injector.get("Export");
          var action = TargetResource["::count::Building::exports"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Building.exports#create
         * @methodOf lbServices.Building.exports
         *
         * @description
         *
         * Creates a new instance in exports of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Export` object.)
         * </em>
         */
        R.exports.create = function() {
          var TargetResource = $injector.get("Export");
          var action = TargetResource["::create::Building::exports"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Building.exports#createMany
         * @methodOf lbServices.Building.exports
         *
         * @description
         *
         * Creates a new instance in exports of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Export` object.)
         * </em>
         */
        R.exports.createMany = function() {
          var TargetResource = $injector.get("Export");
          var action = TargetResource["::createMany::Building::exports"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Building.exports#destroyAll
         * @methodOf lbServices.Building.exports
         *
         * @description
         *
         * Deletes all exports of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R.exports.destroyAll = function() {
          var TargetResource = $injector.get("Export");
          var action = TargetResource["::delete::Building::exports"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Building.exports#destroyById
         * @methodOf lbServices.Building.exports
         *
         * @description
         *
         * Delete a related item by id for exports.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `fk` – `{*}` - Foreign key for exports
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R.exports.destroyById = function() {
          var TargetResource = $injector.get("Export");
          var action = TargetResource["::destroyById::Building::exports"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Building.exports#findById
         * @methodOf lbServices.Building.exports
         *
         * @description
         *
         * Find a related item by id for exports.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `fk` – `{*}` - Foreign key for exports
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Export` object.)
         * </em>
         */
        R.exports.findById = function() {
          var TargetResource = $injector.get("Export");
          var action = TargetResource["::findById::Building::exports"];
          return action.apply(R, arguments);
        };
    /**
     * @ngdoc object
     * @name lbServices.Building.states
     * @header lbServices.Building.states
     * @object
     * @description
     *
     * The object `Building.states` groups methods
     * manipulating `State` instances related to `Building`.
     *
     * Call {@link lbServices.Building#states Building.states()}
     * to query all related instances.
     */


        /**
         * @ngdoc method
         * @name lbServices.Building#states
         * @methodOf lbServices.Building
         *
         * @description
         *
         * Queries states of Building.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `filter` – `{object=}` - 
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `State` object.)
         * </em>
         */
        R.states = function() {
          var TargetResource = $injector.get("State");
          var action = TargetResource["::get::Building::states"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Building.states#count
         * @methodOf lbServices.Building.states
         *
         * @description
         *
         * Counts states of Building.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `count` – `{number=}` - 
         */
        R.states.count = function() {
          var TargetResource = $injector.get("State");
          var action = TargetResource["::count::Building::states"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Building.states#create
         * @methodOf lbServices.Building.states
         *
         * @description
         *
         * Creates a new instance in states of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `State` object.)
         * </em>
         */
        R.states.create = function() {
          var TargetResource = $injector.get("State");
          var action = TargetResource["::create::Building::states"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Building.states#createMany
         * @methodOf lbServices.Building.states
         *
         * @description
         *
         * Creates a new instance in states of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `State` object.)
         * </em>
         */
        R.states.createMany = function() {
          var TargetResource = $injector.get("State");
          var action = TargetResource["::createMany::Building::states"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Building.states#destroyAll
         * @methodOf lbServices.Building.states
         *
         * @description
         *
         * Deletes all states of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R.states.destroyAll = function() {
          var TargetResource = $injector.get("State");
          var action = TargetResource["::delete::Building::states"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Building.states#destroyById
         * @methodOf lbServices.Building.states
         *
         * @description
         *
         * Delete a related item by id for states.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `fk` – `{*}` - Foreign key for states
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R.states.destroyById = function() {
          var TargetResource = $injector.get("State");
          var action = TargetResource["::destroyById::Building::states"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Building.states#findById
         * @methodOf lbServices.Building.states
         *
         * @description
         *
         * Find a related item by id for states.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `fk` – `{*}` - Foreign key for states
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `State` object.)
         * </em>
         */
        R.states.findById = function() {
          var TargetResource = $injector.get("State");
          var action = TargetResource["::findById::Building::states"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Building.states#updateById
         * @methodOf lbServices.Building.states
         *
         * @description
         *
         * Update a related item by id for states.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `fk` – `{*}` - Foreign key for states
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `State` object.)
         * </em>
         */
        R.states.updateById = function() {
          var TargetResource = $injector.get("State");
          var action = TargetResource["::updateById::Building::states"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Building#currentState
         * @methodOf lbServices.Building
         *
         * @description
         *
         * Fetches belongsTo relation currentState.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `refresh` – `{boolean=}` - 
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `State` object.)
         * </em>
         */
        R.currentState = function() {
          var TargetResource = $injector.get("State");
          var action = TargetResource["::get::Building::currentState"];
          return action.apply(R, arguments);
        };
    /**
     * @ngdoc object
     * @name lbServices.Building.recalibrations
     * @header lbServices.Building.recalibrations
     * @object
     * @description
     *
     * The object `Building.recalibrations` groups methods
     * manipulating `Recalibration` instances related to `Building`.
     *
     * Call {@link lbServices.Building#recalibrations Building.recalibrations()}
     * to query all related instances.
     */


        /**
         * @ngdoc method
         * @name lbServices.Building#recalibrations
         * @methodOf lbServices.Building
         *
         * @description
         *
         * Queries recalibrations of Building.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `filter` – `{object=}` - 
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Recalibration` object.)
         * </em>
         */
        R.recalibrations = function() {
          var TargetResource = $injector.get("Recalibration");
          var action = TargetResource["::get::Building::recalibrations"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Building.recalibrations#count
         * @methodOf lbServices.Building.recalibrations
         *
         * @description
         *
         * Counts recalibrations of Building.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `count` – `{number=}` - 
         */
        R.recalibrations.count = function() {
          var TargetResource = $injector.get("Recalibration");
          var action = TargetResource["::count::Building::recalibrations"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Building.recalibrations#create
         * @methodOf lbServices.Building.recalibrations
         *
         * @description
         *
         * Creates a new instance in recalibrations of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Recalibration` object.)
         * </em>
         */
        R.recalibrations.create = function() {
          var TargetResource = $injector.get("Recalibration");
          var action = TargetResource["::create::Building::recalibrations"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Building.recalibrations#createMany
         * @methodOf lbServices.Building.recalibrations
         *
         * @description
         *
         * Creates a new instance in recalibrations of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Recalibration` object.)
         * </em>
         */
        R.recalibrations.createMany = function() {
          var TargetResource = $injector.get("Recalibration");
          var action = TargetResource["::createMany::Building::recalibrations"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Building.recalibrations#destroyAll
         * @methodOf lbServices.Building.recalibrations
         *
         * @description
         *
         * Deletes all recalibrations of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R.recalibrations.destroyAll = function() {
          var TargetResource = $injector.get("Recalibration");
          var action = TargetResource["::delete::Building::recalibrations"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Building.recalibrations#destroyById
         * @methodOf lbServices.Building.recalibrations
         *
         * @description
         *
         * Delete a related item by id for recalibrations.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `fk` – `{*}` - Foreign key for recalibrations
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R.recalibrations.destroyById = function() {
          var TargetResource = $injector.get("Recalibration");
          var action = TargetResource["::destroyById::Building::recalibrations"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Building.recalibrations#findById
         * @methodOf lbServices.Building.recalibrations
         *
         * @description
         *
         * Find a related item by id for recalibrations.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `fk` – `{*}` - Foreign key for recalibrations
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Recalibration` object.)
         * </em>
         */
        R.recalibrations.findById = function() {
          var TargetResource = $injector.get("Recalibration");
          var action = TargetResource["::findById::Building::recalibrations"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Building.recalibrations#updateById
         * @methodOf lbServices.Building.recalibrations
         *
         * @description
         *
         * Update a related item by id for recalibrations.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `fk` – `{*}` - Foreign key for recalibrations
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Recalibration` object.)
         * </em>
         */
        R.recalibrations.updateById = function() {
          var TargetResource = $injector.get("Recalibration");
          var action = TargetResource["::updateById::Building::recalibrations"];
          return action.apply(R, arguments);
        };
    /**
     * @ngdoc object
     * @name lbServices.Building.energySources
     * @header lbServices.Building.energySources
     * @object
     * @description
     *
     * The object `Building.energySources` groups methods
     * manipulating `EnergySource` instances related to `Building`.
     *
     * Call {@link lbServices.Building#energySources Building.energySources()}
     * to query all related instances.
     */


        /**
         * @ngdoc method
         * @name lbServices.Building#energySources
         * @methodOf lbServices.Building
         *
         * @description
         *
         * Queries energySources of Building.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `filter` – `{object=}` - 
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `EnergySource` object.)
         * </em>
         */
        R.energySources = function() {
          var TargetResource = $injector.get("EnergySource");
          var action = TargetResource["::get::Building::energySources"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Building.energySources#count
         * @methodOf lbServices.Building.energySources
         *
         * @description
         *
         * Counts energySources of Building.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `count` – `{number=}` - 
         */
        R.energySources.count = function() {
          var TargetResource = $injector.get("EnergySource");
          var action = TargetResource["::count::Building::energySources"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Building.energySources#create
         * @methodOf lbServices.Building.energySources
         *
         * @description
         *
         * Creates a new instance in energySources of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `EnergySource` object.)
         * </em>
         */
        R.energySources.create = function() {
          var TargetResource = $injector.get("EnergySource");
          var action = TargetResource["::create::Building::energySources"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Building.energySources#createMany
         * @methodOf lbServices.Building.energySources
         *
         * @description
         *
         * Creates a new instance in energySources of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `EnergySource` object.)
         * </em>
         */
        R.energySources.createMany = function() {
          var TargetResource = $injector.get("EnergySource");
          var action = TargetResource["::createMany::Building::energySources"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Building.energySources#destroyAll
         * @methodOf lbServices.Building.energySources
         *
         * @description
         *
         * Deletes all energySources of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R.energySources.destroyAll = function() {
          var TargetResource = $injector.get("EnergySource");
          var action = TargetResource["::delete::Building::energySources"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Building.energySources#destroyById
         * @methodOf lbServices.Building.energySources
         *
         * @description
         *
         * Delete a related item by id for energySources.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `fk` – `{*}` - Foreign key for energySources
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R.energySources.destroyById = function() {
          var TargetResource = $injector.get("EnergySource");
          var action = TargetResource["::destroyById::Building::energySources"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Building.energySources#findById
         * @methodOf lbServices.Building.energySources
         *
         * @description
         *
         * Find a related item by id for energySources.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `fk` – `{*}` - Foreign key for energySources
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `EnergySource` object.)
         * </em>
         */
        R.energySources.findById = function() {
          var TargetResource = $injector.get("EnergySource");
          var action = TargetResource["::findById::Building::energySources"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Building.energySources#updateById
         * @methodOf lbServices.Building.energySources
         *
         * @description
         *
         * Update a related item by id for energySources.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `fk` – `{*}` - Foreign key for energySources
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `EnergySource` object.)
         * </em>
         */
        R.energySources.updateById = function() {
          var TargetResource = $injector.get("EnergySource");
          var action = TargetResource["::updateById::Building::energySources"];
          return action.apply(R, arguments);
        };

    return R;
  }]);

/**
 * @ngdoc object
 * @name lbServices.Bridge
 * @header lbServices.Bridge
 * @object
 *
 * @description
 *
 * A $resource object for interacting with the `Bridge` model.
 *
 * ## Example
 *
 * See
 * {@link http://docs.angularjs.org/api/ngResource.$resource#example $resource}
 * for an example of using this object.
 *
 */
module.factory(
  "Bridge",
  ['LoopBackResource', 'LoopBackAuth', '$injector', function(Resource, LoopBackAuth, $injector) {
    var R = Resource(
      urlBase + "/Bridges/:id",
      { 'id': '@id' },
      {

        // INTERNAL. Use Bridge.building() instead.
        "prototype$__get__building": {
          url: urlBase + "/Bridges/:id/building",
          method: "GET"
        },

        // INTERNAL. Use Bridge.sensors.findById() instead.
        "prototype$__findById__sensors": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/Bridges/:id/sensors/:fk",
          method: "GET"
        },

        // INTERNAL. Use Bridge.sensors.destroyById() instead.
        "prototype$__destroyById__sensors": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/Bridges/:id/sensors/:fk",
          method: "DELETE"
        },

        // INTERNAL. Use Bridge.sensors.updateById() instead.
        "prototype$__updateById__sensors": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/Bridges/:id/sensors/:fk",
          method: "PUT"
        },

        // INTERNAL. Use Bridge.readings.findById() instead.
        "prototype$__findById__readings": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/Bridges/:id/readings/:fk",
          method: "GET"
        },

        // INTERNAL. Use Bridge.readings.destroyById() instead.
        "prototype$__destroyById__readings": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/Bridges/:id/readings/:fk",
          method: "DELETE"
        },

        // INTERNAL. Use Bridge.readings.updateById() instead.
        "prototype$__updateById__readings": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/Bridges/:id/readings/:fk",
          method: "PUT"
        },

        // INTERNAL. Use Bridge.sensors() instead.
        "prototype$__get__sensors": {
          isArray: true,
          url: urlBase + "/Bridges/:id/sensors",
          method: "GET"
        },

        // INTERNAL. Use Bridge.sensors.create() instead.
        "prototype$__create__sensors": {
          url: urlBase + "/Bridges/:id/sensors",
          method: "POST"
        },

        // INTERNAL. Use Bridge.sensors.destroyAll() instead.
        "prototype$__delete__sensors": {
          url: urlBase + "/Bridges/:id/sensors",
          method: "DELETE"
        },

        // INTERNAL. Use Bridge.sensors.count() instead.
        "prototype$__count__sensors": {
          url: urlBase + "/Bridges/:id/sensors/count",
          method: "GET"
        },

        // INTERNAL. Use Bridge.readings() instead.
        "prototype$__get__readings": {
          isArray: true,
          url: urlBase + "/Bridges/:id/readings",
          method: "GET"
        },

        // INTERNAL. Use Bridge.readings.destroyAll() instead.
        "prototype$__delete__readings": {
          url: urlBase + "/Bridges/:id/readings",
          method: "DELETE"
        },

        // INTERNAL. Use Bridge.readings.count() instead.
        "prototype$__count__readings": {
          url: urlBase + "/Bridges/:id/readings/count",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Bridge#create
         * @methodOf lbServices.Bridge
         *
         * @description
         *
         * Create a new instance of the model and persist it into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Bridge` object.)
         * </em>
         */
        "create": {
          url: urlBase + "/Bridges",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.Bridge#createMany
         * @methodOf lbServices.Bridge
         *
         * @description
         *
         * Create a new instance of the model and persist it into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Bridge` object.)
         * </em>
         */
        "createMany": {
          isArray: true,
          url: urlBase + "/Bridges",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.Bridge#upsert
         * @methodOf lbServices.Bridge
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Bridge` object.)
         * </em>
         */
        "upsert": {
          url: urlBase + "/Bridges",
          method: "PUT"
        },

        /**
         * @ngdoc method
         * @name lbServices.Bridge#exists
         * @methodOf lbServices.Bridge
         *
         * @description
         *
         * Check whether a model instance exists in the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `exists` – `{boolean=}` - 
         */
        "exists": {
          url: urlBase + "/Bridges/:id/exists",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Bridge#findById
         * @methodOf lbServices.Bridge
         *
         * @description
         *
         * Find a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         *  - `filter` – `{object=}` - Filter defining fields and include
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Bridge` object.)
         * </em>
         */
        "findById": {
          url: urlBase + "/Bridges/:id",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Bridge#find
         * @methodOf lbServices.Bridge
         *
         * @description
         *
         * Find all instances of the model matched by filter from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, include, order, offset, and limit
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Bridge` object.)
         * </em>
         */
        "find": {
          isArray: true,
          url: urlBase + "/Bridges",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Bridge#findOne
         * @methodOf lbServices.Bridge
         *
         * @description
         *
         * Find first instance of the model matched by filter from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, include, order, offset, and limit
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Bridge` object.)
         * </em>
         */
        "findOne": {
          url: urlBase + "/Bridges/findOne",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Bridge#updateAll
         * @methodOf lbServices.Bridge
         *
         * @description
         *
         * Update instances of the model matched by where from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * The number of instances updated
         */
        "updateAll": {
          url: urlBase + "/Bridges/update",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.Bridge#deleteById
         * @methodOf lbServices.Bridge
         *
         * @description
         *
         * Delete a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Bridge` object.)
         * </em>
         */
        "deleteById": {
          url: urlBase + "/Bridges/:id",
          method: "DELETE"
        },

        /**
         * @ngdoc method
         * @name lbServices.Bridge#count
         * @methodOf lbServices.Bridge
         *
         * @description
         *
         * Count instances of the model matched by where from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `count` – `{number=}` - 
         */
        "count": {
          url: urlBase + "/Bridges/count",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Bridge#prototype$updateAttributes
         * @methodOf lbServices.Bridge
         *
         * @description
         *
         * Update attributes for a model instance and persist it into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Bridge` object.)
         * </em>
         */
        "prototype$updateAttributes": {
          url: urlBase + "/Bridges/:id",
          method: "PUT"
        },

        /**
         * @ngdoc method
         * @name lbServices.Bridge#createChangeStream
         * @methodOf lbServices.Bridge
         *
         * @description
         *
         * Create a change stream.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         *  - `options` – `{object=}` - 
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `changes` – `{ReadableStream=}` - 
         */
        "createChangeStream": {
          url: urlBase + "/Bridges/change-stream",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.Bridge#recordReadings
         * @methodOf lbServices.Bridge
         *
         * @description
         *
         * <em>
         * (The remote method definition does not provide any description.)
         * </em>
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         *  - `id` – `{string}` - 
         *
         *  - `data` – `{*=}` - 
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Bridge` object.)
         * </em>
         */
        "recordReadings": {
          url: urlBase + "/Bridges/:id/recordreadings",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.Bridge#latestReading
         * @methodOf lbServices.Bridge
         *
         * @description
         *
         * <em>
         * (The remote method definition does not provide any description.)
         * </em>
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{string}` - 
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Bridge` object.)
         * </em>
         */
        "latestReading": {
          url: urlBase + "/Bridges/:id/latestreading",
          method: "GET"
        },

        // INTERNAL. Use Building.bridges.findById() instead.
        "::findById::Building::bridges": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/Buildings/:id/bridges/:fk",
          method: "GET"
        },

        // INTERNAL. Use Building.bridges.destroyById() instead.
        "::destroyById::Building::bridges": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/Buildings/:id/bridges/:fk",
          method: "DELETE"
        },

        // INTERNAL. Use Building.bridges.updateById() instead.
        "::updateById::Building::bridges": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/Buildings/:id/bridges/:fk",
          method: "PUT"
        },

        // INTERNAL. Use Building.bridges() instead.
        "::get::Building::bridges": {
          isArray: true,
          url: urlBase + "/Buildings/:id/bridges",
          method: "GET"
        },

        // INTERNAL. Use Building.bridges.create() instead.
        "::create::Building::bridges": {
          url: urlBase + "/Buildings/:id/bridges",
          method: "POST"
        },

        // INTERNAL. Use Building.bridges.createMany() instead.
        "::createMany::Building::bridges": {
          isArray: true,
          url: urlBase + "/Buildings/:id/bridges",
          method: "POST"
        },

        // INTERNAL. Use Building.bridges.destroyAll() instead.
        "::delete::Building::bridges": {
          url: urlBase + "/Buildings/:id/bridges",
          method: "DELETE"
        },

        // INTERNAL. Use Building.bridges.count() instead.
        "::count::Building::bridges": {
          url: urlBase + "/Buildings/:id/bridges/count",
          method: "GET"
        },

        // INTERNAL. Use Sensor.bridge() instead.
        "::get::Sensor::bridge": {
          url: urlBase + "/Sensors/:id/bridge",
          method: "GET"
        },

        // INTERNAL. Use Reading.bridge() instead.
        "::get::Reading::bridge": {
          url: urlBase + "/Readings/:id/bridge",
          method: "GET"
        },
      }
    );



        /**
         * @ngdoc method
         * @name lbServices.Bridge#updateOrCreate
         * @methodOf lbServices.Bridge
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Bridge` object.)
         * </em>
         */
        R["updateOrCreate"] = R["upsert"];

        /**
         * @ngdoc method
         * @name lbServices.Bridge#update
         * @methodOf lbServices.Bridge
         *
         * @description
         *
         * Update instances of the model matched by where from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * The number of instances updated
         */
        R["update"] = R["updateAll"];

        /**
         * @ngdoc method
         * @name lbServices.Bridge#destroyById
         * @methodOf lbServices.Bridge
         *
         * @description
         *
         * Delete a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Bridge` object.)
         * </em>
         */
        R["destroyById"] = R["deleteById"];

        /**
         * @ngdoc method
         * @name lbServices.Bridge#removeById
         * @methodOf lbServices.Bridge
         *
         * @description
         *
         * Delete a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Bridge` object.)
         * </em>
         */
        R["removeById"] = R["deleteById"];


    /**
    * @ngdoc property
    * @name lbServices.Bridge#modelName
    * @propertyOf lbServices.Bridge
    * @description
    * The name of the model represented by this $resource,
    * i.e. `Bridge`.
    */
    R.modelName = "Bridge";


        /**
         * @ngdoc method
         * @name lbServices.Bridge#building
         * @methodOf lbServices.Bridge
         *
         * @description
         *
         * Fetches belongsTo relation building.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `refresh` – `{boolean=}` - 
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Building` object.)
         * </em>
         */
        R.building = function() {
          var TargetResource = $injector.get("Building");
          var action = TargetResource["::get::Bridge::building"];
          return action.apply(R, arguments);
        };
    /**
     * @ngdoc object
     * @name lbServices.Bridge.sensors
     * @header lbServices.Bridge.sensors
     * @object
     * @description
     *
     * The object `Bridge.sensors` groups methods
     * manipulating `Sensor` instances related to `Bridge`.
     *
     * Call {@link lbServices.Bridge#sensors Bridge.sensors()}
     * to query all related instances.
     */


        /**
         * @ngdoc method
         * @name lbServices.Bridge#sensors
         * @methodOf lbServices.Bridge
         *
         * @description
         *
         * Queries sensors of Bridge.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `filter` – `{object=}` - 
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Sensor` object.)
         * </em>
         */
        R.sensors = function() {
          var TargetResource = $injector.get("Sensor");
          var action = TargetResource["::get::Bridge::sensors"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Bridge.sensors#count
         * @methodOf lbServices.Bridge.sensors
         *
         * @description
         *
         * Counts sensors of Bridge.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `count` – `{number=}` - 
         */
        R.sensors.count = function() {
          var TargetResource = $injector.get("Sensor");
          var action = TargetResource["::count::Bridge::sensors"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Bridge.sensors#create
         * @methodOf lbServices.Bridge.sensors
         *
         * @description
         *
         * Creates a new instance in sensors of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Sensor` object.)
         * </em>
         */
        R.sensors.create = function() {
          var TargetResource = $injector.get("Sensor");
          var action = TargetResource["::create::Bridge::sensors"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Bridge.sensors#createMany
         * @methodOf lbServices.Bridge.sensors
         *
         * @description
         *
         * Creates a new instance in sensors of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Sensor` object.)
         * </em>
         */
        R.sensors.createMany = function() {
          var TargetResource = $injector.get("Sensor");
          var action = TargetResource["::createMany::Bridge::sensors"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Bridge.sensors#destroyAll
         * @methodOf lbServices.Bridge.sensors
         *
         * @description
         *
         * Deletes all sensors of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R.sensors.destroyAll = function() {
          var TargetResource = $injector.get("Sensor");
          var action = TargetResource["::delete::Bridge::sensors"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Bridge.sensors#destroyById
         * @methodOf lbServices.Bridge.sensors
         *
         * @description
         *
         * Delete a related item by id for sensors.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `fk` – `{*}` - Foreign key for sensors
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R.sensors.destroyById = function() {
          var TargetResource = $injector.get("Sensor");
          var action = TargetResource["::destroyById::Bridge::sensors"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Bridge.sensors#findById
         * @methodOf lbServices.Bridge.sensors
         *
         * @description
         *
         * Find a related item by id for sensors.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `fk` – `{*}` - Foreign key for sensors
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Sensor` object.)
         * </em>
         */
        R.sensors.findById = function() {
          var TargetResource = $injector.get("Sensor");
          var action = TargetResource["::findById::Bridge::sensors"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Bridge.sensors#updateById
         * @methodOf lbServices.Bridge.sensors
         *
         * @description
         *
         * Update a related item by id for sensors.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `fk` – `{*}` - Foreign key for sensors
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Sensor` object.)
         * </em>
         */
        R.sensors.updateById = function() {
          var TargetResource = $injector.get("Sensor");
          var action = TargetResource["::updateById::Bridge::sensors"];
          return action.apply(R, arguments);
        };
    /**
     * @ngdoc object
     * @name lbServices.Bridge.readings
     * @header lbServices.Bridge.readings
     * @object
     * @description
     *
     * The object `Bridge.readings` groups methods
     * manipulating `Reading` instances related to `Bridge`.
     *
     * Call {@link lbServices.Bridge#readings Bridge.readings()}
     * to query all related instances.
     */


        /**
         * @ngdoc method
         * @name lbServices.Bridge#readings
         * @methodOf lbServices.Bridge
         *
         * @description
         *
         * Queries readings of Bridge.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `filter` – `{object=}` - 
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Reading` object.)
         * </em>
         */
        R.readings = function() {
          var TargetResource = $injector.get("Reading");
          var action = TargetResource["::get::Bridge::readings"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Bridge.readings#count
         * @methodOf lbServices.Bridge.readings
         *
         * @description
         *
         * Counts readings of Bridge.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `count` – `{number=}` - 
         */
        R.readings.count = function() {
          var TargetResource = $injector.get("Reading");
          var action = TargetResource["::count::Bridge::readings"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Bridge.readings#destroyAll
         * @methodOf lbServices.Bridge.readings
         *
         * @description
         *
         * Deletes all readings of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R.readings.destroyAll = function() {
          var TargetResource = $injector.get("Reading");
          var action = TargetResource["::delete::Bridge::readings"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Bridge.readings#destroyById
         * @methodOf lbServices.Bridge.readings
         *
         * @description
         *
         * Delete a related item by id for readings.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `fk` – `{*}` - Foreign key for readings
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R.readings.destroyById = function() {
          var TargetResource = $injector.get("Reading");
          var action = TargetResource["::destroyById::Bridge::readings"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Bridge.readings#findById
         * @methodOf lbServices.Bridge.readings
         *
         * @description
         *
         * Find a related item by id for readings.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `fk` – `{*}` - Foreign key for readings
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Reading` object.)
         * </em>
         */
        R.readings.findById = function() {
          var TargetResource = $injector.get("Reading");
          var action = TargetResource["::findById::Bridge::readings"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Bridge.readings#updateById
         * @methodOf lbServices.Bridge.readings
         *
         * @description
         *
         * Update a related item by id for readings.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `fk` – `{*}` - Foreign key for readings
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Reading` object.)
         * </em>
         */
        R.readings.updateById = function() {
          var TargetResource = $injector.get("Reading");
          var action = TargetResource["::updateById::Bridge::readings"];
          return action.apply(R, arguments);
        };

    return R;
  }]);

/**
 * @ngdoc object
 * @name lbServices.Sensor
 * @header lbServices.Sensor
 * @object
 *
 * @description
 *
 * A $resource object for interacting with the `Sensor` model.
 *
 * ## Example
 *
 * See
 * {@link http://docs.angularjs.org/api/ngResource.$resource#example $resource}
 * for an example of using this object.
 *
 */
module.factory(
  "Sensor",
  ['LoopBackResource', 'LoopBackAuth', '$injector', function(Resource, LoopBackAuth, $injector) {
    var R = Resource(
      urlBase + "/Sensors/:id",
      { 'id': '@id' },
      {

        // INTERNAL. Use Sensor.bridge() instead.
        "prototype$__get__bridge": {
          url: urlBase + "/Sensors/:id/bridge",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Sensor#create
         * @methodOf lbServices.Sensor
         *
         * @description
         *
         * Create a new instance of the model and persist it into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Sensor` object.)
         * </em>
         */
        "create": {
          url: urlBase + "/Sensors",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.Sensor#createMany
         * @methodOf lbServices.Sensor
         *
         * @description
         *
         * Create a new instance of the model and persist it into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Sensor` object.)
         * </em>
         */
        "createMany": {
          isArray: true,
          url: urlBase + "/Sensors",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.Sensor#upsert
         * @methodOf lbServices.Sensor
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Sensor` object.)
         * </em>
         */
        "upsert": {
          url: urlBase + "/Sensors",
          method: "PUT"
        },

        /**
         * @ngdoc method
         * @name lbServices.Sensor#exists
         * @methodOf lbServices.Sensor
         *
         * @description
         *
         * Check whether a model instance exists in the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `exists` – `{boolean=}` - 
         */
        "exists": {
          url: urlBase + "/Sensors/:id/exists",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Sensor#findById
         * @methodOf lbServices.Sensor
         *
         * @description
         *
         * Find a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         *  - `filter` – `{object=}` - Filter defining fields and include
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Sensor` object.)
         * </em>
         */
        "findById": {
          url: urlBase + "/Sensors/:id",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Sensor#find
         * @methodOf lbServices.Sensor
         *
         * @description
         *
         * Find all instances of the model matched by filter from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, include, order, offset, and limit
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Sensor` object.)
         * </em>
         */
        "find": {
          isArray: true,
          url: urlBase + "/Sensors",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Sensor#findOne
         * @methodOf lbServices.Sensor
         *
         * @description
         *
         * Find first instance of the model matched by filter from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, include, order, offset, and limit
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Sensor` object.)
         * </em>
         */
        "findOne": {
          url: urlBase + "/Sensors/findOne",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Sensor#updateAll
         * @methodOf lbServices.Sensor
         *
         * @description
         *
         * Update instances of the model matched by where from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * The number of instances updated
         */
        "updateAll": {
          url: urlBase + "/Sensors/update",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.Sensor#deleteById
         * @methodOf lbServices.Sensor
         *
         * @description
         *
         * Delete a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Sensor` object.)
         * </em>
         */
        "deleteById": {
          url: urlBase + "/Sensors/:id",
          method: "DELETE"
        },

        /**
         * @ngdoc method
         * @name lbServices.Sensor#count
         * @methodOf lbServices.Sensor
         *
         * @description
         *
         * Count instances of the model matched by where from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `count` – `{number=}` - 
         */
        "count": {
          url: urlBase + "/Sensors/count",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Sensor#prototype$updateAttributes
         * @methodOf lbServices.Sensor
         *
         * @description
         *
         * Update attributes for a model instance and persist it into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Sensor` object.)
         * </em>
         */
        "prototype$updateAttributes": {
          url: urlBase + "/Sensors/:id",
          method: "PUT"
        },

        /**
         * @ngdoc method
         * @name lbServices.Sensor#createChangeStream
         * @methodOf lbServices.Sensor
         *
         * @description
         *
         * Create a change stream.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         *  - `options` – `{object=}` - 
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `changes` – `{ReadableStream=}` - 
         */
        "createChangeStream": {
          url: urlBase + "/Sensors/change-stream",
          method: "POST"
        },

        // INTERNAL. Use Building.batteryVoltageSensor() instead.
        "::get::Building::batteryVoltageSensor": {
          url: urlBase + "/Buildings/:id/batteryVoltageSensor",
          method: "GET"
        },

        // INTERNAL. Use Building.batteryCurrentSensor() instead.
        "::get::Building::batteryCurrentSensor": {
          url: urlBase + "/Buildings/:id/batteryCurrentSensor",
          method: "GET"
        },

        // INTERNAL. Use Building.buildingPowerSensor() instead.
        "::get::Building::buildingPowerSensor": {
          url: urlBase + "/Buildings/:id/buildingPowerSensor",
          method: "GET"
        },

        // INTERNAL. Use Building.loadCurrentSensor() instead.
        "::get::Building::loadCurrentSensor": {
          url: urlBase + "/Buildings/:id/loadCurrentSensor",
          method: "GET"
        },

        // INTERNAL. Use Bridge.sensors.findById() instead.
        "::findById::Bridge::sensors": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/Bridges/:id/sensors/:fk",
          method: "GET"
        },

        // INTERNAL. Use Bridge.sensors.destroyById() instead.
        "::destroyById::Bridge::sensors": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/Bridges/:id/sensors/:fk",
          method: "DELETE"
        },

        // INTERNAL. Use Bridge.sensors.updateById() instead.
        "::updateById::Bridge::sensors": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/Bridges/:id/sensors/:fk",
          method: "PUT"
        },

        // INTERNAL. Use Bridge.sensors() instead.
        "::get::Bridge::sensors": {
          isArray: true,
          url: urlBase + "/Bridges/:id/sensors",
          method: "GET"
        },

        // INTERNAL. Use Bridge.sensors.create() instead.
        "::create::Bridge::sensors": {
          url: urlBase + "/Bridges/:id/sensors",
          method: "POST"
        },

        // INTERNAL. Use Bridge.sensors.createMany() instead.
        "::createMany::Bridge::sensors": {
          isArray: true,
          url: urlBase + "/Bridges/:id/sensors",
          method: "POST"
        },

        // INTERNAL. Use Bridge.sensors.destroyAll() instead.
        "::delete::Bridge::sensors": {
          url: urlBase + "/Bridges/:id/sensors",
          method: "DELETE"
        },

        // INTERNAL. Use Bridge.sensors.count() instead.
        "::count::Bridge::sensors": {
          url: urlBase + "/Bridges/:id/sensors/count",
          method: "GET"
        },

        // INTERNAL. Use EnergySource.currentSensor() instead.
        "::get::EnergySource::currentSensor": {
          url: urlBase + "/EnergySources/:id/currentSensor",
          method: "GET"
        },
      }
    );



        /**
         * @ngdoc method
         * @name lbServices.Sensor#updateOrCreate
         * @methodOf lbServices.Sensor
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Sensor` object.)
         * </em>
         */
        R["updateOrCreate"] = R["upsert"];

        /**
         * @ngdoc method
         * @name lbServices.Sensor#update
         * @methodOf lbServices.Sensor
         *
         * @description
         *
         * Update instances of the model matched by where from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * The number of instances updated
         */
        R["update"] = R["updateAll"];

        /**
         * @ngdoc method
         * @name lbServices.Sensor#destroyById
         * @methodOf lbServices.Sensor
         *
         * @description
         *
         * Delete a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Sensor` object.)
         * </em>
         */
        R["destroyById"] = R["deleteById"];

        /**
         * @ngdoc method
         * @name lbServices.Sensor#removeById
         * @methodOf lbServices.Sensor
         *
         * @description
         *
         * Delete a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Sensor` object.)
         * </em>
         */
        R["removeById"] = R["deleteById"];


    /**
    * @ngdoc property
    * @name lbServices.Sensor#modelName
    * @propertyOf lbServices.Sensor
    * @description
    * The name of the model represented by this $resource,
    * i.e. `Sensor`.
    */
    R.modelName = "Sensor";


        /**
         * @ngdoc method
         * @name lbServices.Sensor#bridge
         * @methodOf lbServices.Sensor
         *
         * @description
         *
         * Fetches belongsTo relation bridge.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `refresh` – `{boolean=}` - 
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Bridge` object.)
         * </em>
         */
        R.bridge = function() {
          var TargetResource = $injector.get("Bridge");
          var action = TargetResource["::get::Sensor::bridge"];
          return action.apply(R, arguments);
        };

    return R;
  }]);

/**
 * @ngdoc object
 * @name lbServices.Reading
 * @header lbServices.Reading
 * @object
 *
 * @description
 *
 * A $resource object for interacting with the `Reading` model.
 *
 * ## Example
 *
 * See
 * {@link http://docs.angularjs.org/api/ngResource.$resource#example $resource}
 * for an example of using this object.
 *
 */
module.factory(
  "Reading",
  ['LoopBackResource', 'LoopBackAuth', '$injector', function(Resource, LoopBackAuth, $injector) {
    var R = Resource(
      urlBase + "/Readings/:id",
      { 'id': '@id' },
      {

        // INTERNAL. Use Reading.bridge() instead.
        "prototype$__get__bridge": {
          url: urlBase + "/Readings/:id/bridge",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Reading#exists
         * @methodOf lbServices.Reading
         *
         * @description
         *
         * Check whether a model instance exists in the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `exists` – `{boolean=}` - 
         */
        "exists": {
          url: urlBase + "/Readings/:id/exists",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Reading#findById
         * @methodOf lbServices.Reading
         *
         * @description
         *
         * Find a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         *  - `filter` – `{object=}` - Filter defining fields and include
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Reading` object.)
         * </em>
         */
        "findById": {
          url: urlBase + "/Readings/:id",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Reading#find
         * @methodOf lbServices.Reading
         *
         * @description
         *
         * Find all instances of the model matched by filter from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, include, order, offset, and limit
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Reading` object.)
         * </em>
         */
        "find": {
          isArray: true,
          url: urlBase + "/Readings",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Reading#findOne
         * @methodOf lbServices.Reading
         *
         * @description
         *
         * Find first instance of the model matched by filter from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, include, order, offset, and limit
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Reading` object.)
         * </em>
         */
        "findOne": {
          url: urlBase + "/Readings/findOne",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Reading#updateAll
         * @methodOf lbServices.Reading
         *
         * @description
         *
         * Update instances of the model matched by where from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * The number of instances updated
         */
        "updateAll": {
          url: urlBase + "/Readings/update",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.Reading#deleteById
         * @methodOf lbServices.Reading
         *
         * @description
         *
         * Delete a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Reading` object.)
         * </em>
         */
        "deleteById": {
          url: urlBase + "/Readings/:id",
          method: "DELETE"
        },

        /**
         * @ngdoc method
         * @name lbServices.Reading#count
         * @methodOf lbServices.Reading
         *
         * @description
         *
         * Count instances of the model matched by where from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `count` – `{number=}` - 
         */
        "count": {
          url: urlBase + "/Readings/count",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Reading#prototype$updateAttributes
         * @methodOf lbServices.Reading
         *
         * @description
         *
         * Update attributes for a model instance and persist it into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Reading` object.)
         * </em>
         */
        "prototype$updateAttributes": {
          url: urlBase + "/Readings/:id",
          method: "PUT"
        },

        /**
         * @ngdoc method
         * @name lbServices.Reading#createChangeStream
         * @methodOf lbServices.Reading
         *
         * @description
         *
         * Create a change stream.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         *  - `options` – `{object=}` - 
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `changes` – `{ReadableStream=}` - 
         */
        "createChangeStream": {
          url: urlBase + "/Readings/change-stream",
          method: "POST"
        },

        // INTERNAL. Use Bridge.readings.findById() instead.
        "::findById::Bridge::readings": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/Bridges/:id/readings/:fk",
          method: "GET"
        },

        // INTERNAL. Use Bridge.readings.destroyById() instead.
        "::destroyById::Bridge::readings": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/Bridges/:id/readings/:fk",
          method: "DELETE"
        },

        // INTERNAL. Use Bridge.readings.updateById() instead.
        "::updateById::Bridge::readings": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/Bridges/:id/readings/:fk",
          method: "PUT"
        },

        // INTERNAL. Use Bridge.readings() instead.
        "::get::Bridge::readings": {
          isArray: true,
          url: urlBase + "/Bridges/:id/readings",
          method: "GET"
        },

        // INTERNAL. Use Bridge.readings.destroyAll() instead.
        "::delete::Bridge::readings": {
          url: urlBase + "/Bridges/:id/readings",
          method: "DELETE"
        },

        // INTERNAL. Use Bridge.readings.count() instead.
        "::count::Bridge::readings": {
          url: urlBase + "/Bridges/:id/readings/count",
          method: "GET"
        },

        // INTERNAL. Use State.reading() instead.
        "::get::State::reading": {
          url: urlBase + "/States/:id/reading",
          method: "GET"
        },
      }
    );



        /**
         * @ngdoc method
         * @name lbServices.Reading#update
         * @methodOf lbServices.Reading
         *
         * @description
         *
         * Update instances of the model matched by where from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * The number of instances updated
         */
        R["update"] = R["updateAll"];

        /**
         * @ngdoc method
         * @name lbServices.Reading#destroyById
         * @methodOf lbServices.Reading
         *
         * @description
         *
         * Delete a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Reading` object.)
         * </em>
         */
        R["destroyById"] = R["deleteById"];

        /**
         * @ngdoc method
         * @name lbServices.Reading#removeById
         * @methodOf lbServices.Reading
         *
         * @description
         *
         * Delete a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Reading` object.)
         * </em>
         */
        R["removeById"] = R["deleteById"];


    /**
    * @ngdoc property
    * @name lbServices.Reading#modelName
    * @propertyOf lbServices.Reading
    * @description
    * The name of the model represented by this $resource,
    * i.e. `Reading`.
    */
    R.modelName = "Reading";


        /**
         * @ngdoc method
         * @name lbServices.Reading#bridge
         * @methodOf lbServices.Reading
         *
         * @description
         *
         * Fetches belongsTo relation bridge.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `refresh` – `{boolean=}` - 
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Bridge` object.)
         * </em>
         */
        R.bridge = function() {
          var TargetResource = $injector.get("Bridge");
          var action = TargetResource["::get::Reading::bridge"];
          return action.apply(R, arguments);
        };

    return R;
  }]);

/**
 * @ngdoc object
 * @name lbServices.People
 * @header lbServices.People
 * @object
 *
 * @description
 *
 * A $resource object for interacting with the `People` model.
 *
 * ## Example
 *
 * See
 * {@link http://docs.angularjs.org/api/ngResource.$resource#example $resource}
 * for an example of using this object.
 *
 */
module.factory(
  "People",
  ['LoopBackResource', 'LoopBackAuth', '$injector', function(Resource, LoopBackAuth, $injector) {
    var R = Resource(
      urlBase + "/People/:id",
      { 'id': '@id' },
      {

        /**
         * @ngdoc method
         * @name lbServices.People#prototype$__findById__accessTokens
         * @methodOf lbServices.People
         *
         * @description
         *
         * Find a related item by id for accessTokens.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         *  - `fk` – `{*}` - Foreign key for accessTokens
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `People` object.)
         * </em>
         */
        "prototype$__findById__accessTokens": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/People/:id/accessTokens/:fk",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.People#prototype$__destroyById__accessTokens
         * @methodOf lbServices.People
         *
         * @description
         *
         * Delete a related item by id for accessTokens.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         *  - `fk` – `{*}` - Foreign key for accessTokens
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "prototype$__destroyById__accessTokens": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/People/:id/accessTokens/:fk",
          method: "DELETE"
        },

        /**
         * @ngdoc method
         * @name lbServices.People#prototype$__updateById__accessTokens
         * @methodOf lbServices.People
         *
         * @description
         *
         * Update a related item by id for accessTokens.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         *  - `fk` – `{*}` - Foreign key for accessTokens
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `People` object.)
         * </em>
         */
        "prototype$__updateById__accessTokens": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/People/:id/accessTokens/:fk",
          method: "PUT"
        },

        // INTERNAL. Use People.buildings.findById() instead.
        "prototype$__findById__buildings": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/People/:id/buildings/:fk",
          method: "GET"
        },

        // INTERNAL. Use People.buildings.destroyById() instead.
        "prototype$__destroyById__buildings": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/People/:id/buildings/:fk",
          method: "DELETE"
        },

        // INTERNAL. Use People.buildings.updateById() instead.
        "prototype$__updateById__buildings": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/People/:id/buildings/:fk",
          method: "PUT"
        },

        // INTERNAL. Use People.buildings.link() instead.
        "prototype$__link__buildings": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/People/:id/buildings/rel/:fk",
          method: "PUT"
        },

        // INTERNAL. Use People.buildings.unlink() instead.
        "prototype$__unlink__buildings": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/People/:id/buildings/rel/:fk",
          method: "DELETE"
        },

        // INTERNAL. Use People.buildings.exists() instead.
        "prototype$__exists__buildings": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/People/:id/buildings/rel/:fk",
          method: "HEAD"
        },

        /**
         * @ngdoc method
         * @name lbServices.People#prototype$__get__accessTokens
         * @methodOf lbServices.People
         *
         * @description
         *
         * Queries accessTokens of People.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         *  - `filter` – `{object=}` - 
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `People` object.)
         * </em>
         */
        "prototype$__get__accessTokens": {
          isArray: true,
          url: urlBase + "/People/:id/accessTokens",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.People#prototype$__create__accessTokens
         * @methodOf lbServices.People
         *
         * @description
         *
         * Creates a new instance in accessTokens of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `People` object.)
         * </em>
         */
        "prototype$__create__accessTokens": {
          url: urlBase + "/People/:id/accessTokens",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.People#prototype$__delete__accessTokens
         * @methodOf lbServices.People
         *
         * @description
         *
         * Deletes all accessTokens of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "prototype$__delete__accessTokens": {
          url: urlBase + "/People/:id/accessTokens",
          method: "DELETE"
        },

        /**
         * @ngdoc method
         * @name lbServices.People#prototype$__count__accessTokens
         * @methodOf lbServices.People
         *
         * @description
         *
         * Counts accessTokens of People.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `count` – `{number=}` - 
         */
        "prototype$__count__accessTokens": {
          url: urlBase + "/People/:id/accessTokens/count",
          method: "GET"
        },

        // INTERNAL. Use People.buildings() instead.
        "prototype$__get__buildings": {
          isArray: true,
          url: urlBase + "/People/:id/buildings",
          method: "GET"
        },

        // INTERNAL. Use People.buildings.create() instead.
        "prototype$__create__buildings": {
          url: urlBase + "/People/:id/buildings",
          method: "POST"
        },

        // INTERNAL. Use People.buildings.destroyAll() instead.
        "prototype$__delete__buildings": {
          url: urlBase + "/People/:id/buildings",
          method: "DELETE"
        },

        // INTERNAL. Use People.buildings.count() instead.
        "prototype$__count__buildings": {
          url: urlBase + "/People/:id/buildings/count",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.People#create
         * @methodOf lbServices.People
         *
         * @description
         *
         * Create a new instance of the model and persist it into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `People` object.)
         * </em>
         */
        "create": {
          url: urlBase + "/People",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.People#createMany
         * @methodOf lbServices.People
         *
         * @description
         *
         * Create a new instance of the model and persist it into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `People` object.)
         * </em>
         */
        "createMany": {
          isArray: true,
          url: urlBase + "/People",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.People#upsert
         * @methodOf lbServices.People
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `People` object.)
         * </em>
         */
        "upsert": {
          url: urlBase + "/People",
          method: "PUT"
        },

        /**
         * @ngdoc method
         * @name lbServices.People#exists
         * @methodOf lbServices.People
         *
         * @description
         *
         * Check whether a model instance exists in the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `exists` – `{boolean=}` - 
         */
        "exists": {
          url: urlBase + "/People/:id/exists",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.People#findById
         * @methodOf lbServices.People
         *
         * @description
         *
         * Find a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         *  - `filter` – `{object=}` - Filter defining fields and include
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `People` object.)
         * </em>
         */
        "findById": {
          url: urlBase + "/People/:id",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.People#find
         * @methodOf lbServices.People
         *
         * @description
         *
         * Find all instances of the model matched by filter from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, include, order, offset, and limit
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `People` object.)
         * </em>
         */
        "find": {
          isArray: true,
          url: urlBase + "/People",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.People#findOne
         * @methodOf lbServices.People
         *
         * @description
         *
         * Find first instance of the model matched by filter from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, include, order, offset, and limit
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `People` object.)
         * </em>
         */
        "findOne": {
          url: urlBase + "/People/findOne",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.People#updateAll
         * @methodOf lbServices.People
         *
         * @description
         *
         * Update instances of the model matched by where from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * The number of instances updated
         */
        "updateAll": {
          url: urlBase + "/People/update",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.People#deleteById
         * @methodOf lbServices.People
         *
         * @description
         *
         * Delete a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `People` object.)
         * </em>
         */
        "deleteById": {
          url: urlBase + "/People/:id",
          method: "DELETE"
        },

        /**
         * @ngdoc method
         * @name lbServices.People#count
         * @methodOf lbServices.People
         *
         * @description
         *
         * Count instances of the model matched by where from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `count` – `{number=}` - 
         */
        "count": {
          url: urlBase + "/People/count",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.People#prototype$updateAttributes
         * @methodOf lbServices.People
         *
         * @description
         *
         * Update attributes for a model instance and persist it into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `People` object.)
         * </em>
         */
        "prototype$updateAttributes": {
          url: urlBase + "/People/:id",
          method: "PUT"
        },

        /**
         * @ngdoc method
         * @name lbServices.People#createChangeStream
         * @methodOf lbServices.People
         *
         * @description
         *
         * Create a change stream.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         *  - `options` – `{object=}` - 
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `changes` – `{ReadableStream=}` - 
         */
        "createChangeStream": {
          url: urlBase + "/People/change-stream",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.People#login
         * @methodOf lbServices.People
         *
         * @description
         *
         * Login a user with username/email and password.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `include` – `{string=}` - Related objects to include in the response. See the description of return value for more details.
         *   Default value: `user`.
         *
         *  - `rememberMe` - `boolean` - Whether the authentication credentials
         *     should be remembered in localStorage across app/browser restarts.
         *     Default: `true`.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * The response body contains properties of the AccessToken created on login.
         * Depending on the value of `include` parameter, the body may contain additional properties:
         * 
         *   - `user` - `{User}` - Data of the currently logged in user. (`include=user`)
         * 
         *
         */
        "login": {
          params: {
            include: "user"
          },
          interceptor: {
            response: function(response) {
              var accessToken = response.data;
              LoopBackAuth.setUser(accessToken.id, accessToken.userId, accessToken.user);
              LoopBackAuth.rememberMe = response.config.params.rememberMe !== false;
              LoopBackAuth.save();
              return response.resource;
            }
          },
          url: urlBase + "/People/login",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.People#logout
         * @methodOf lbServices.People
         *
         * @description
         *
         * Logout a user with access token.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         *  - `access_token` – `{string}` - Do not supply this argument, it is automatically extracted from request headers.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "logout": {
          interceptor: {
            response: function(response) {
              LoopBackAuth.clearUser();
              LoopBackAuth.clearStorage();
              return response.resource;
            }
          },
          url: urlBase + "/People/logout",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.People#confirm
         * @methodOf lbServices.People
         *
         * @description
         *
         * Confirm a user registration with email verification token.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `uid` – `{string}` - 
         *
         *  - `token` – `{string}` - 
         *
         *  - `redirect` – `{string=}` - 
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "confirm": {
          url: urlBase + "/People/confirm",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.People#resetPassword
         * @methodOf lbServices.People
         *
         * @description
         *
         * Reset password for a user with email.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "resetPassword": {
          url: urlBase + "/People/reset",
          method: "POST"
        },

        // INTERNAL. Use Building.people.findById() instead.
        "::findById::Building::people": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/Buildings/:id/people/:fk",
          method: "GET"
        },

        // INTERNAL. Use Building.people.destroyById() instead.
        "::destroyById::Building::people": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/Buildings/:id/people/:fk",
          method: "DELETE"
        },

        // INTERNAL. Use Building.people.updateById() instead.
        "::updateById::Building::people": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/Buildings/:id/people/:fk",
          method: "PUT"
        },

        // INTERNAL. Use Building.people.link() instead.
        "::link::Building::people": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/Buildings/:id/people/rel/:fk",
          method: "PUT"
        },

        // INTERNAL. Use Building.people.unlink() instead.
        "::unlink::Building::people": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/Buildings/:id/people/rel/:fk",
          method: "DELETE"
        },

        // INTERNAL. Use Building.people.exists() instead.
        "::exists::Building::people": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/Buildings/:id/people/rel/:fk",
          method: "HEAD"
        },

        // INTERNAL. Use Building.people() instead.
        "::get::Building::people": {
          isArray: true,
          url: urlBase + "/Buildings/:id/people",
          method: "GET"
        },

        // INTERNAL. Use Building.people.create() instead.
        "::create::Building::people": {
          url: urlBase + "/Buildings/:id/people",
          method: "POST"
        },

        // INTERNAL. Use Building.people.createMany() instead.
        "::createMany::Building::people": {
          isArray: true,
          url: urlBase + "/Buildings/:id/people",
          method: "POST"
        },

        // INTERNAL. Use Building.people.destroyAll() instead.
        "::delete::Building::people": {
          url: urlBase + "/Buildings/:id/people",
          method: "DELETE"
        },

        // INTERNAL. Use Building.people.count() instead.
        "::count::Building::people": {
          url: urlBase + "/Buildings/:id/people/count",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.People#getCurrent
         * @methodOf lbServices.People
         *
         * @description
         *
         * Get data of the currently logged user. Fail with HTTP result 401
         * when there is no user logged in.
         *
         * @param {function(Object,Object)=} successCb
         *    Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *    `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         */
        "getCurrent": {
           url: urlBase + "/People" + "/:id",
           method: "GET",
           params: {
             id: function() {
              var id = LoopBackAuth.currentUserId;
              if (id == null) id = '__anonymous__';
              return id;
            },
          },
          interceptor: {
            response: function(response) {
              LoopBackAuth.currentUserData = response.data;
              return response.resource;
            }
          },
          __isGetCurrentUser__ : true
        }
      }
    );



        /**
         * @ngdoc method
         * @name lbServices.People#updateOrCreate
         * @methodOf lbServices.People
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `People` object.)
         * </em>
         */
        R["updateOrCreate"] = R["upsert"];

        /**
         * @ngdoc method
         * @name lbServices.People#update
         * @methodOf lbServices.People
         *
         * @description
         *
         * Update instances of the model matched by where from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * The number of instances updated
         */
        R["update"] = R["updateAll"];

        /**
         * @ngdoc method
         * @name lbServices.People#destroyById
         * @methodOf lbServices.People
         *
         * @description
         *
         * Delete a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `People` object.)
         * </em>
         */
        R["destroyById"] = R["deleteById"];

        /**
         * @ngdoc method
         * @name lbServices.People#removeById
         * @methodOf lbServices.People
         *
         * @description
         *
         * Delete a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `People` object.)
         * </em>
         */
        R["removeById"] = R["deleteById"];

        /**
         * @ngdoc method
         * @name lbServices.People#getCachedCurrent
         * @methodOf lbServices.People
         *
         * @description
         *
         * Get data of the currently logged user that was returned by the last
         * call to {@link lbServices.People#login} or
         * {@link lbServices.People#getCurrent}. Return null when there
         * is no user logged in or the data of the current user were not fetched
         * yet.
         *
         * @returns {Object} A People instance.
         */
        R.getCachedCurrent = function() {
          var data = LoopBackAuth.currentUserData;
          return data ? new R(data) : null;
        };

        /**
         * @ngdoc method
         * @name lbServices.People#isAuthenticated
         * @methodOf lbServices.People
         *
         * @returns {boolean} True if the current user is authenticated (logged in).
         */
        R.isAuthenticated = function() {
          return this.getCurrentId() != null;
        };

        /**
         * @ngdoc method
         * @name lbServices.People#getCurrentId
         * @methodOf lbServices.People
         *
         * @returns {Object} Id of the currently logged-in user or null.
         */
        R.getCurrentId = function() {
          return LoopBackAuth.currentUserId;
        };

    /**
    * @ngdoc property
    * @name lbServices.People#modelName
    * @propertyOf lbServices.People
    * @description
    * The name of the model represented by this $resource,
    * i.e. `People`.
    */
    R.modelName = "People";

    /**
     * @ngdoc object
     * @name lbServices.People.buildings
     * @header lbServices.People.buildings
     * @object
     * @description
     *
     * The object `People.buildings` groups methods
     * manipulating `Building` instances related to `People`.
     *
     * Call {@link lbServices.People#buildings People.buildings()}
     * to query all related instances.
     */


        /**
         * @ngdoc method
         * @name lbServices.People#buildings
         * @methodOf lbServices.People
         *
         * @description
         *
         * Queries buildings of People.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         *  - `filter` – `{object=}` - 
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Building` object.)
         * </em>
         */
        R.buildings = function() {
          var TargetResource = $injector.get("Building");
          var action = TargetResource["::get::People::buildings"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.People.buildings#count
         * @methodOf lbServices.People.buildings
         *
         * @description
         *
         * Counts buildings of People.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `count` – `{number=}` - 
         */
        R.buildings.count = function() {
          var TargetResource = $injector.get("Building");
          var action = TargetResource["::count::People::buildings"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.People.buildings#create
         * @methodOf lbServices.People.buildings
         *
         * @description
         *
         * Creates a new instance in buildings of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Building` object.)
         * </em>
         */
        R.buildings.create = function() {
          var TargetResource = $injector.get("Building");
          var action = TargetResource["::create::People::buildings"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.People.buildings#createMany
         * @methodOf lbServices.People.buildings
         *
         * @description
         *
         * Creates a new instance in buildings of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Building` object.)
         * </em>
         */
        R.buildings.createMany = function() {
          var TargetResource = $injector.get("Building");
          var action = TargetResource["::createMany::People::buildings"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.People.buildings#destroyAll
         * @methodOf lbServices.People.buildings
         *
         * @description
         *
         * Deletes all buildings of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R.buildings.destroyAll = function() {
          var TargetResource = $injector.get("Building");
          var action = TargetResource["::delete::People::buildings"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.People.buildings#destroyById
         * @methodOf lbServices.People.buildings
         *
         * @description
         *
         * Delete a related item by id for buildings.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         *  - `fk` – `{*}` - Foreign key for buildings
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R.buildings.destroyById = function() {
          var TargetResource = $injector.get("Building");
          var action = TargetResource["::destroyById::People::buildings"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.People.buildings#exists
         * @methodOf lbServices.People.buildings
         *
         * @description
         *
         * Check the existence of buildings relation to an item by id.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         *  - `fk` – `{*}` - Foreign key for buildings
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Building` object.)
         * </em>
         */
        R.buildings.exists = function() {
          var TargetResource = $injector.get("Building");
          var action = TargetResource["::exists::People::buildings"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.People.buildings#findById
         * @methodOf lbServices.People.buildings
         *
         * @description
         *
         * Find a related item by id for buildings.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         *  - `fk` – `{*}` - Foreign key for buildings
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Building` object.)
         * </em>
         */
        R.buildings.findById = function() {
          var TargetResource = $injector.get("Building");
          var action = TargetResource["::findById::People::buildings"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.People.buildings#link
         * @methodOf lbServices.People.buildings
         *
         * @description
         *
         * Add a related item by id for buildings.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         *  - `fk` – `{*}` - Foreign key for buildings
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Building` object.)
         * </em>
         */
        R.buildings.link = function() {
          var TargetResource = $injector.get("Building");
          var action = TargetResource["::link::People::buildings"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.People.buildings#unlink
         * @methodOf lbServices.People.buildings
         *
         * @description
         *
         * Remove the buildings relation to an item by id.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         *  - `fk` – `{*}` - Foreign key for buildings
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R.buildings.unlink = function() {
          var TargetResource = $injector.get("Building");
          var action = TargetResource["::unlink::People::buildings"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.People.buildings#updateById
         * @methodOf lbServices.People.buildings
         *
         * @description
         *
         * Update a related item by id for buildings.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         *  - `fk` – `{*}` - Foreign key for buildings
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Building` object.)
         * </em>
         */
        R.buildings.updateById = function() {
          var TargetResource = $injector.get("Building");
          var action = TargetResource["::updateById::People::buildings"];
          return action.apply(R, arguments);
        };

    return R;
  }]);

/**
 * @ngdoc object
 * @name lbServices.Export
 * @header lbServices.Export
 * @object
 *
 * @description
 *
 * A $resource object for interacting with the `Export` model.
 *
 * ## Example
 *
 * See
 * {@link http://docs.angularjs.org/api/ngResource.$resource#example $resource}
 * for an example of using this object.
 *
 */
module.factory(
  "Export",
  ['LoopBackResource', 'LoopBackAuth', '$injector', function(Resource, LoopBackAuth, $injector) {
    var R = Resource(
      urlBase + "/Exports/:id",
      { 'id': '@id' },
      {

        // INTERNAL. Use Export.building() instead.
        "prototype$__get__building": {
          url: urlBase + "/Exports/:id/building",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Export#create
         * @methodOf lbServices.Export
         *
         * @description
         *
         * Create a new instance of the model and persist it into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Export` object.)
         * </em>
         */
        "create": {
          url: urlBase + "/Exports",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.Export#createMany
         * @methodOf lbServices.Export
         *
         * @description
         *
         * Create a new instance of the model and persist it into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Export` object.)
         * </em>
         */
        "createMany": {
          isArray: true,
          url: urlBase + "/Exports",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.Export#upsert
         * @methodOf lbServices.Export
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Export` object.)
         * </em>
         */
        "upsert": {
          url: urlBase + "/Exports",
          method: "PUT"
        },

        /**
         * @ngdoc method
         * @name lbServices.Export#exists
         * @methodOf lbServices.Export
         *
         * @description
         *
         * Check whether a model instance exists in the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `exists` – `{boolean=}` - 
         */
        "exists": {
          url: urlBase + "/Exports/:id/exists",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Export#findById
         * @methodOf lbServices.Export
         *
         * @description
         *
         * Find a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         *  - `filter` – `{object=}` - Filter defining fields and include
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Export` object.)
         * </em>
         */
        "findById": {
          url: urlBase + "/Exports/:id",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Export#find
         * @methodOf lbServices.Export
         *
         * @description
         *
         * Find all instances of the model matched by filter from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, include, order, offset, and limit
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Export` object.)
         * </em>
         */
        "find": {
          isArray: true,
          url: urlBase + "/Exports",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Export#findOne
         * @methodOf lbServices.Export
         *
         * @description
         *
         * Find first instance of the model matched by filter from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, include, order, offset, and limit
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Export` object.)
         * </em>
         */
        "findOne": {
          url: urlBase + "/Exports/findOne",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Export#updateAll
         * @methodOf lbServices.Export
         *
         * @description
         *
         * Update instances of the model matched by where from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * The number of instances updated
         */
        "updateAll": {
          url: urlBase + "/Exports/update",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.Export#deleteById
         * @methodOf lbServices.Export
         *
         * @description
         *
         * Delete a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Export` object.)
         * </em>
         */
        "deleteById": {
          url: urlBase + "/Exports/:id",
          method: "DELETE"
        },

        /**
         * @ngdoc method
         * @name lbServices.Export#count
         * @methodOf lbServices.Export
         *
         * @description
         *
         * Count instances of the model matched by where from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `count` – `{number=}` - 
         */
        "count": {
          url: urlBase + "/Exports/count",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Export#prototype$updateAttributes
         * @methodOf lbServices.Export
         *
         * @description
         *
         * Update attributes for a model instance and persist it into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Export` object.)
         * </em>
         */
        "prototype$updateAttributes": {
          url: urlBase + "/Exports/:id",
          method: "PUT"
        },

        /**
         * @ngdoc method
         * @name lbServices.Export#createChangeStream
         * @methodOf lbServices.Export
         *
         * @description
         *
         * Create a change stream.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         *  - `options` – `{object=}` - 
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `changes` – `{ReadableStream=}` - 
         */
        "createChangeStream": {
          url: urlBase + "/Exports/change-stream",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.Export#download
         * @methodOf lbServices.Export
         *
         * @description
         *
         * <em>
         * (The remote method definition does not provide any description.)
         * </em>
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{string}` - 
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Export` object.)
         * </em>
         */
        "download": {
          url: urlBase + "/Exports/:id/download/:fileName",
          method: "GET"
        },

        // INTERNAL. Use Building.exports.findById() instead.
        "::findById::Building::exports": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/Buildings/:id/exports/:fk",
          method: "GET"
        },

        // INTERNAL. Use Building.exports.destroyById() instead.
        "::destroyById::Building::exports": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/Buildings/:id/exports/:fk",
          method: "DELETE"
        },

        // INTERNAL. Use Building.exports() instead.
        "::get::Building::exports": {
          isArray: true,
          url: urlBase + "/Buildings/:id/exports",
          method: "GET"
        },

        // INTERNAL. Use Building.exports.create() instead.
        "::create::Building::exports": {
          url: urlBase + "/Buildings/:id/exports",
          method: "POST"
        },

        // INTERNAL. Use Building.exports.createMany() instead.
        "::createMany::Building::exports": {
          isArray: true,
          url: urlBase + "/Buildings/:id/exports",
          method: "POST"
        },

        // INTERNAL. Use Building.exports.destroyAll() instead.
        "::delete::Building::exports": {
          url: urlBase + "/Buildings/:id/exports",
          method: "DELETE"
        },

        // INTERNAL. Use Building.exports.count() instead.
        "::count::Building::exports": {
          url: urlBase + "/Buildings/:id/exports/count",
          method: "GET"
        },
      }
    );



        /**
         * @ngdoc method
         * @name lbServices.Export#updateOrCreate
         * @methodOf lbServices.Export
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Export` object.)
         * </em>
         */
        R["updateOrCreate"] = R["upsert"];

        /**
         * @ngdoc method
         * @name lbServices.Export#update
         * @methodOf lbServices.Export
         *
         * @description
         *
         * Update instances of the model matched by where from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * The number of instances updated
         */
        R["update"] = R["updateAll"];

        /**
         * @ngdoc method
         * @name lbServices.Export#destroyById
         * @methodOf lbServices.Export
         *
         * @description
         *
         * Delete a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Export` object.)
         * </em>
         */
        R["destroyById"] = R["deleteById"];

        /**
         * @ngdoc method
         * @name lbServices.Export#removeById
         * @methodOf lbServices.Export
         *
         * @description
         *
         * Delete a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Export` object.)
         * </em>
         */
        R["removeById"] = R["deleteById"];


    /**
    * @ngdoc property
    * @name lbServices.Export#modelName
    * @propertyOf lbServices.Export
    * @description
    * The name of the model represented by this $resource,
    * i.e. `Export`.
    */
    R.modelName = "Export";


        /**
         * @ngdoc method
         * @name lbServices.Export#building
         * @methodOf lbServices.Export
         *
         * @description
         *
         * Fetches belongsTo relation building.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `refresh` – `{boolean=}` - 
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Building` object.)
         * </em>
         */
        R.building = function() {
          var TargetResource = $injector.get("Building");
          var action = TargetResource["::get::Export::building"];
          return action.apply(R, arguments);
        };

    return R;
  }]);

/**
 * @ngdoc object
 * @name lbServices.State
 * @header lbServices.State
 * @object
 *
 * @description
 *
 * A $resource object for interacting with the `State` model.
 *
 * ## Example
 *
 * See
 * {@link http://docs.angularjs.org/api/ngResource.$resource#example $resource}
 * for an example of using this object.
 *
 */
module.factory(
  "State",
  ['LoopBackResource', 'LoopBackAuth', '$injector', function(Resource, LoopBackAuth, $injector) {
    var R = Resource(
      urlBase + "/States/:id",
      { 'id': '@id' },
      {

        // INTERNAL. Use State.building() instead.
        "prototype$__get__building": {
          url: urlBase + "/States/:id/building",
          method: "GET"
        },

        // INTERNAL. Use State.reading() instead.
        "prototype$__get__reading": {
          url: urlBase + "/States/:id/reading",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.State#create
         * @methodOf lbServices.State
         *
         * @description
         *
         * Create a new instance of the model and persist it into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `State` object.)
         * </em>
         */
        "create": {
          url: urlBase + "/States",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.State#createMany
         * @methodOf lbServices.State
         *
         * @description
         *
         * Create a new instance of the model and persist it into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `State` object.)
         * </em>
         */
        "createMany": {
          isArray: true,
          url: urlBase + "/States",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.State#upsert
         * @methodOf lbServices.State
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `State` object.)
         * </em>
         */
        "upsert": {
          url: urlBase + "/States",
          method: "PUT"
        },

        /**
         * @ngdoc method
         * @name lbServices.State#exists
         * @methodOf lbServices.State
         *
         * @description
         *
         * Check whether a model instance exists in the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `exists` – `{boolean=}` - 
         */
        "exists": {
          url: urlBase + "/States/:id/exists",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.State#findById
         * @methodOf lbServices.State
         *
         * @description
         *
         * Find a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         *  - `filter` – `{object=}` - Filter defining fields and include
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `State` object.)
         * </em>
         */
        "findById": {
          url: urlBase + "/States/:id",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.State#find
         * @methodOf lbServices.State
         *
         * @description
         *
         * Find all instances of the model matched by filter from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, include, order, offset, and limit
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `State` object.)
         * </em>
         */
        "find": {
          isArray: true,
          url: urlBase + "/States",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.State#findOne
         * @methodOf lbServices.State
         *
         * @description
         *
         * Find first instance of the model matched by filter from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, include, order, offset, and limit
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `State` object.)
         * </em>
         */
        "findOne": {
          url: urlBase + "/States/findOne",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.State#updateAll
         * @methodOf lbServices.State
         *
         * @description
         *
         * Update instances of the model matched by where from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * The number of instances updated
         */
        "updateAll": {
          url: urlBase + "/States/update",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.State#deleteById
         * @methodOf lbServices.State
         *
         * @description
         *
         * Delete a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `State` object.)
         * </em>
         */
        "deleteById": {
          url: urlBase + "/States/:id",
          method: "DELETE"
        },

        /**
         * @ngdoc method
         * @name lbServices.State#count
         * @methodOf lbServices.State
         *
         * @description
         *
         * Count instances of the model matched by where from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `count` – `{number=}` - 
         */
        "count": {
          url: urlBase + "/States/count",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.State#prototype$updateAttributes
         * @methodOf lbServices.State
         *
         * @description
         *
         * Update attributes for a model instance and persist it into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `State` object.)
         * </em>
         */
        "prototype$updateAttributes": {
          url: urlBase + "/States/:id",
          method: "PUT"
        },

        /**
         * @ngdoc method
         * @name lbServices.State#createChangeStream
         * @methodOf lbServices.State
         *
         * @description
         *
         * Create a change stream.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         *  - `options` – `{object=}` - 
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `changes` – `{ReadableStream=}` - 
         */
        "createChangeStream": {
          url: urlBase + "/States/change-stream",
          method: "POST"
        },

        // INTERNAL. Use Building.states.findById() instead.
        "::findById::Building::states": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/Buildings/:id/states/:fk",
          method: "GET"
        },

        // INTERNAL. Use Building.states.destroyById() instead.
        "::destroyById::Building::states": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/Buildings/:id/states/:fk",
          method: "DELETE"
        },

        // INTERNAL. Use Building.states.updateById() instead.
        "::updateById::Building::states": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/Buildings/:id/states/:fk",
          method: "PUT"
        },

        // INTERNAL. Use Building.currentState() instead.
        "::get::Building::currentState": {
          url: urlBase + "/Buildings/:id/currentState",
          method: "GET"
        },

        // INTERNAL. Use Building.states() instead.
        "::get::Building::states": {
          isArray: true,
          url: urlBase + "/Buildings/:id/states",
          method: "GET"
        },

        // INTERNAL. Use Building.states.create() instead.
        "::create::Building::states": {
          url: urlBase + "/Buildings/:id/states",
          method: "POST"
        },

        // INTERNAL. Use Building.states.createMany() instead.
        "::createMany::Building::states": {
          isArray: true,
          url: urlBase + "/Buildings/:id/states",
          method: "POST"
        },

        // INTERNAL. Use Building.states.destroyAll() instead.
        "::delete::Building::states": {
          url: urlBase + "/Buildings/:id/states",
          method: "DELETE"
        },

        // INTERNAL. Use Building.states.count() instead.
        "::count::Building::states": {
          url: urlBase + "/Buildings/:id/states/count",
          method: "GET"
        },
      }
    );



        /**
         * @ngdoc method
         * @name lbServices.State#updateOrCreate
         * @methodOf lbServices.State
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `State` object.)
         * </em>
         */
        R["updateOrCreate"] = R["upsert"];

        /**
         * @ngdoc method
         * @name lbServices.State#update
         * @methodOf lbServices.State
         *
         * @description
         *
         * Update instances of the model matched by where from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * The number of instances updated
         */
        R["update"] = R["updateAll"];

        /**
         * @ngdoc method
         * @name lbServices.State#destroyById
         * @methodOf lbServices.State
         *
         * @description
         *
         * Delete a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `State` object.)
         * </em>
         */
        R["destroyById"] = R["deleteById"];

        /**
         * @ngdoc method
         * @name lbServices.State#removeById
         * @methodOf lbServices.State
         *
         * @description
         *
         * Delete a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `State` object.)
         * </em>
         */
        R["removeById"] = R["deleteById"];


    /**
    * @ngdoc property
    * @name lbServices.State#modelName
    * @propertyOf lbServices.State
    * @description
    * The name of the model represented by this $resource,
    * i.e. `State`.
    */
    R.modelName = "State";


        /**
         * @ngdoc method
         * @name lbServices.State#building
         * @methodOf lbServices.State
         *
         * @description
         *
         * Fetches belongsTo relation building.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `refresh` – `{boolean=}` - 
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Building` object.)
         * </em>
         */
        R.building = function() {
          var TargetResource = $injector.get("Building");
          var action = TargetResource["::get::State::building"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.State#reading
         * @methodOf lbServices.State
         *
         * @description
         *
         * Fetches belongsTo relation reading.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `refresh` – `{boolean=}` - 
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Reading` object.)
         * </em>
         */
        R.reading = function() {
          var TargetResource = $injector.get("Reading");
          var action = TargetResource["::get::State::reading"];
          return action.apply(R, arguments);
        };

    return R;
  }]);

/**
 * @ngdoc object
 * @name lbServices.Recalibration
 * @header lbServices.Recalibration
 * @object
 *
 * @description
 *
 * A $resource object for interacting with the `Recalibration` model.
 *
 * ## Example
 *
 * See
 * {@link http://docs.angularjs.org/api/ngResource.$resource#example $resource}
 * for an example of using this object.
 *
 */
module.factory(
  "Recalibration",
  ['LoopBackResource', 'LoopBackAuth', '$injector', function(Resource, LoopBackAuth, $injector) {
    var R = Resource(
      urlBase + "/Recalibrations/:id",
      { 'id': '@id' },
      {

        // INTERNAL. Use Recalibration.building() instead.
        "prototype$__get__building": {
          url: urlBase + "/Recalibrations/:id/building",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Recalibration#create
         * @methodOf lbServices.Recalibration
         *
         * @description
         *
         * Create a new instance of the model and persist it into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Recalibration` object.)
         * </em>
         */
        "create": {
          url: urlBase + "/Recalibrations",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.Recalibration#createMany
         * @methodOf lbServices.Recalibration
         *
         * @description
         *
         * Create a new instance of the model and persist it into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Recalibration` object.)
         * </em>
         */
        "createMany": {
          isArray: true,
          url: urlBase + "/Recalibrations",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.Recalibration#upsert
         * @methodOf lbServices.Recalibration
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Recalibration` object.)
         * </em>
         */
        "upsert": {
          url: urlBase + "/Recalibrations",
          method: "PUT"
        },

        /**
         * @ngdoc method
         * @name lbServices.Recalibration#exists
         * @methodOf lbServices.Recalibration
         *
         * @description
         *
         * Check whether a model instance exists in the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `exists` – `{boolean=}` - 
         */
        "exists": {
          url: urlBase + "/Recalibrations/:id/exists",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Recalibration#findById
         * @methodOf lbServices.Recalibration
         *
         * @description
         *
         * Find a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         *  - `filter` – `{object=}` - Filter defining fields and include
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Recalibration` object.)
         * </em>
         */
        "findById": {
          url: urlBase + "/Recalibrations/:id",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Recalibration#find
         * @methodOf lbServices.Recalibration
         *
         * @description
         *
         * Find all instances of the model matched by filter from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, include, order, offset, and limit
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Recalibration` object.)
         * </em>
         */
        "find": {
          isArray: true,
          url: urlBase + "/Recalibrations",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Recalibration#findOne
         * @methodOf lbServices.Recalibration
         *
         * @description
         *
         * Find first instance of the model matched by filter from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, include, order, offset, and limit
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Recalibration` object.)
         * </em>
         */
        "findOne": {
          url: urlBase + "/Recalibrations/findOne",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Recalibration#updateAll
         * @methodOf lbServices.Recalibration
         *
         * @description
         *
         * Update instances of the model matched by where from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * The number of instances updated
         */
        "updateAll": {
          url: urlBase + "/Recalibrations/update",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.Recalibration#deleteById
         * @methodOf lbServices.Recalibration
         *
         * @description
         *
         * Delete a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Recalibration` object.)
         * </em>
         */
        "deleteById": {
          url: urlBase + "/Recalibrations/:id",
          method: "DELETE"
        },

        /**
         * @ngdoc method
         * @name lbServices.Recalibration#count
         * @methodOf lbServices.Recalibration
         *
         * @description
         *
         * Count instances of the model matched by where from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `count` – `{number=}` - 
         */
        "count": {
          url: urlBase + "/Recalibrations/count",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Recalibration#prototype$updateAttributes
         * @methodOf lbServices.Recalibration
         *
         * @description
         *
         * Update attributes for a model instance and persist it into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Recalibration` object.)
         * </em>
         */
        "prototype$updateAttributes": {
          url: urlBase + "/Recalibrations/:id",
          method: "PUT"
        },

        /**
         * @ngdoc method
         * @name lbServices.Recalibration#createChangeStream
         * @methodOf lbServices.Recalibration
         *
         * @description
         *
         * Create a change stream.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         *  - `options` – `{object=}` - 
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `changes` – `{ReadableStream=}` - 
         */
        "createChangeStream": {
          url: urlBase + "/Recalibrations/change-stream",
          method: "POST"
        },

        // INTERNAL. Use Building.recalibrations.findById() instead.
        "::findById::Building::recalibrations": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/Buildings/:id/recalibrations/:fk",
          method: "GET"
        },

        // INTERNAL. Use Building.recalibrations.destroyById() instead.
        "::destroyById::Building::recalibrations": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/Buildings/:id/recalibrations/:fk",
          method: "DELETE"
        },

        // INTERNAL. Use Building.recalibrations.updateById() instead.
        "::updateById::Building::recalibrations": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/Buildings/:id/recalibrations/:fk",
          method: "PUT"
        },

        // INTERNAL. Use Building.recalibrations() instead.
        "::get::Building::recalibrations": {
          isArray: true,
          url: urlBase + "/Buildings/:id/recalibrations",
          method: "GET"
        },

        // INTERNAL. Use Building.recalibrations.create() instead.
        "::create::Building::recalibrations": {
          url: urlBase + "/Buildings/:id/recalibrations",
          method: "POST"
        },

        // INTERNAL. Use Building.recalibrations.createMany() instead.
        "::createMany::Building::recalibrations": {
          isArray: true,
          url: urlBase + "/Buildings/:id/recalibrations",
          method: "POST"
        },

        // INTERNAL. Use Building.recalibrations.destroyAll() instead.
        "::delete::Building::recalibrations": {
          url: urlBase + "/Buildings/:id/recalibrations",
          method: "DELETE"
        },

        // INTERNAL. Use Building.recalibrations.count() instead.
        "::count::Building::recalibrations": {
          url: urlBase + "/Buildings/:id/recalibrations/count",
          method: "GET"
        },
      }
    );



        /**
         * @ngdoc method
         * @name lbServices.Recalibration#updateOrCreate
         * @methodOf lbServices.Recalibration
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Recalibration` object.)
         * </em>
         */
        R["updateOrCreate"] = R["upsert"];

        /**
         * @ngdoc method
         * @name lbServices.Recalibration#update
         * @methodOf lbServices.Recalibration
         *
         * @description
         *
         * Update instances of the model matched by where from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * The number of instances updated
         */
        R["update"] = R["updateAll"];

        /**
         * @ngdoc method
         * @name lbServices.Recalibration#destroyById
         * @methodOf lbServices.Recalibration
         *
         * @description
         *
         * Delete a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Recalibration` object.)
         * </em>
         */
        R["destroyById"] = R["deleteById"];

        /**
         * @ngdoc method
         * @name lbServices.Recalibration#removeById
         * @methodOf lbServices.Recalibration
         *
         * @description
         *
         * Delete a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Recalibration` object.)
         * </em>
         */
        R["removeById"] = R["deleteById"];


    /**
    * @ngdoc property
    * @name lbServices.Recalibration#modelName
    * @propertyOf lbServices.Recalibration
    * @description
    * The name of the model represented by this $resource,
    * i.e. `Recalibration`.
    */
    R.modelName = "Recalibration";


        /**
         * @ngdoc method
         * @name lbServices.Recalibration#building
         * @methodOf lbServices.Recalibration
         *
         * @description
         *
         * Fetches belongsTo relation building.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `refresh` – `{boolean=}` - 
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Building` object.)
         * </em>
         */
        R.building = function() {
          var TargetResource = $injector.get("Building");
          var action = TargetResource["::get::Recalibration::building"];
          return action.apply(R, arguments);
        };

    return R;
  }]);

/**
 * @ngdoc object
 * @name lbServices.EnergySource
 * @header lbServices.EnergySource
 * @object
 *
 * @description
 *
 * A $resource object for interacting with the `EnergySource` model.
 *
 * ## Example
 *
 * See
 * {@link http://docs.angularjs.org/api/ngResource.$resource#example $resource}
 * for an example of using this object.
 *
 */
module.factory(
  "EnergySource",
  ['LoopBackResource', 'LoopBackAuth', '$injector', function(Resource, LoopBackAuth, $injector) {
    var R = Resource(
      urlBase + "/EnergySources/:id",
      { 'id': '@id' },
      {

        // INTERNAL. Use EnergySource.currentSensor() instead.
        "prototype$__get__currentSensor": {
          url: urlBase + "/EnergySources/:id/currentSensor",
          method: "GET"
        },

        // INTERNAL. Use EnergySource.building() instead.
        "prototype$__get__building": {
          url: urlBase + "/EnergySources/:id/building",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.EnergySource#create
         * @methodOf lbServices.EnergySource
         *
         * @description
         *
         * Create a new instance of the model and persist it into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `EnergySource` object.)
         * </em>
         */
        "create": {
          url: urlBase + "/EnergySources",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.EnergySource#createMany
         * @methodOf lbServices.EnergySource
         *
         * @description
         *
         * Create a new instance of the model and persist it into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `EnergySource` object.)
         * </em>
         */
        "createMany": {
          isArray: true,
          url: urlBase + "/EnergySources",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.EnergySource#upsert
         * @methodOf lbServices.EnergySource
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `EnergySource` object.)
         * </em>
         */
        "upsert": {
          url: urlBase + "/EnergySources",
          method: "PUT"
        },

        /**
         * @ngdoc method
         * @name lbServices.EnergySource#exists
         * @methodOf lbServices.EnergySource
         *
         * @description
         *
         * Check whether a model instance exists in the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `exists` – `{boolean=}` - 
         */
        "exists": {
          url: urlBase + "/EnergySources/:id/exists",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.EnergySource#findById
         * @methodOf lbServices.EnergySource
         *
         * @description
         *
         * Find a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         *  - `filter` – `{object=}` - Filter defining fields and include
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `EnergySource` object.)
         * </em>
         */
        "findById": {
          url: urlBase + "/EnergySources/:id",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.EnergySource#find
         * @methodOf lbServices.EnergySource
         *
         * @description
         *
         * Find all instances of the model matched by filter from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, include, order, offset, and limit
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `EnergySource` object.)
         * </em>
         */
        "find": {
          isArray: true,
          url: urlBase + "/EnergySources",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.EnergySource#findOne
         * @methodOf lbServices.EnergySource
         *
         * @description
         *
         * Find first instance of the model matched by filter from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, include, order, offset, and limit
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `EnergySource` object.)
         * </em>
         */
        "findOne": {
          url: urlBase + "/EnergySources/findOne",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.EnergySource#updateAll
         * @methodOf lbServices.EnergySource
         *
         * @description
         *
         * Update instances of the model matched by where from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * The number of instances updated
         */
        "updateAll": {
          url: urlBase + "/EnergySources/update",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.EnergySource#deleteById
         * @methodOf lbServices.EnergySource
         *
         * @description
         *
         * Delete a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `EnergySource` object.)
         * </em>
         */
        "deleteById": {
          url: urlBase + "/EnergySources/:id",
          method: "DELETE"
        },

        /**
         * @ngdoc method
         * @name lbServices.EnergySource#count
         * @methodOf lbServices.EnergySource
         *
         * @description
         *
         * Count instances of the model matched by where from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `count` – `{number=}` - 
         */
        "count": {
          url: urlBase + "/EnergySources/count",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.EnergySource#prototype$updateAttributes
         * @methodOf lbServices.EnergySource
         *
         * @description
         *
         * Update attributes for a model instance and persist it into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `EnergySource` object.)
         * </em>
         */
        "prototype$updateAttributes": {
          url: urlBase + "/EnergySources/:id",
          method: "PUT"
        },

        /**
         * @ngdoc method
         * @name lbServices.EnergySource#createChangeStream
         * @methodOf lbServices.EnergySource
         *
         * @description
         *
         * Create a change stream.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         *  - `options` – `{object=}` - 
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `changes` – `{ReadableStream=}` - 
         */
        "createChangeStream": {
          url: urlBase + "/EnergySources/change-stream",
          method: "POST"
        },

        // INTERNAL. Use Building.energySources.findById() instead.
        "::findById::Building::energySources": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/Buildings/:id/energySources/:fk",
          method: "GET"
        },

        // INTERNAL. Use Building.energySources.destroyById() instead.
        "::destroyById::Building::energySources": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/Buildings/:id/energySources/:fk",
          method: "DELETE"
        },

        // INTERNAL. Use Building.energySources.updateById() instead.
        "::updateById::Building::energySources": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/Buildings/:id/energySources/:fk",
          method: "PUT"
        },

        // INTERNAL. Use Building.energySources() instead.
        "::get::Building::energySources": {
          isArray: true,
          url: urlBase + "/Buildings/:id/energySources",
          method: "GET"
        },

        // INTERNAL. Use Building.energySources.create() instead.
        "::create::Building::energySources": {
          url: urlBase + "/Buildings/:id/energySources",
          method: "POST"
        },

        // INTERNAL. Use Building.energySources.createMany() instead.
        "::createMany::Building::energySources": {
          isArray: true,
          url: urlBase + "/Buildings/:id/energySources",
          method: "POST"
        },

        // INTERNAL. Use Building.energySources.destroyAll() instead.
        "::delete::Building::energySources": {
          url: urlBase + "/Buildings/:id/energySources",
          method: "DELETE"
        },

        // INTERNAL. Use Building.energySources.count() instead.
        "::count::Building::energySources": {
          url: urlBase + "/Buildings/:id/energySources/count",
          method: "GET"
        },
      }
    );



        /**
         * @ngdoc method
         * @name lbServices.EnergySource#updateOrCreate
         * @methodOf lbServices.EnergySource
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `EnergySource` object.)
         * </em>
         */
        R["updateOrCreate"] = R["upsert"];

        /**
         * @ngdoc method
         * @name lbServices.EnergySource#update
         * @methodOf lbServices.EnergySource
         *
         * @description
         *
         * Update instances of the model matched by where from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * The number of instances updated
         */
        R["update"] = R["updateAll"];

        /**
         * @ngdoc method
         * @name lbServices.EnergySource#destroyById
         * @methodOf lbServices.EnergySource
         *
         * @description
         *
         * Delete a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `EnergySource` object.)
         * </em>
         */
        R["destroyById"] = R["deleteById"];

        /**
         * @ngdoc method
         * @name lbServices.EnergySource#removeById
         * @methodOf lbServices.EnergySource
         *
         * @description
         *
         * Delete a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `EnergySource` object.)
         * </em>
         */
        R["removeById"] = R["deleteById"];


    /**
    * @ngdoc property
    * @name lbServices.EnergySource#modelName
    * @propertyOf lbServices.EnergySource
    * @description
    * The name of the model represented by this $resource,
    * i.e. `EnergySource`.
    */
    R.modelName = "EnergySource";


        /**
         * @ngdoc method
         * @name lbServices.EnergySource#currentSensor
         * @methodOf lbServices.EnergySource
         *
         * @description
         *
         * Fetches belongsTo relation currentSensor.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `refresh` – `{boolean=}` - 
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Sensor` object.)
         * </em>
         */
        R.currentSensor = function() {
          var TargetResource = $injector.get("Sensor");
          var action = TargetResource["::get::EnergySource::currentSensor"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.EnergySource#building
         * @methodOf lbServices.EnergySource
         *
         * @description
         *
         * Fetches belongsTo relation building.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `refresh` – `{boolean=}` - 
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Building` object.)
         * </em>
         */
        R.building = function() {
          var TargetResource = $injector.get("Building");
          var action = TargetResource["::get::EnergySource::building"];
          return action.apply(R, arguments);
        };

    return R;
  }]);


module
  .factory('LoopBackAuth', function() {
    var props = ['accessTokenId', 'currentUserId', 'rememberMe'];
    var propsPrefix = '$LoopBack$';

    function LoopBackAuth() {
      var self = this;
      props.forEach(function(name) {
        self[name] = load(name);
      });
      this.currentUserData = null;
    }

    LoopBackAuth.prototype.save = function() {
      var self = this;
      var storage = this.rememberMe ? localStorage : sessionStorage;
      props.forEach(function(name) {
        save(storage, name, self[name]);
      });
    };

    LoopBackAuth.prototype.setUser = function(accessTokenId, userId, userData) {
      this.accessTokenId = accessTokenId;
      this.currentUserId = userId;
      this.currentUserData = userData;
    }

    LoopBackAuth.prototype.clearUser = function() {
      this.accessTokenId = null;
      this.currentUserId = null;
      this.currentUserData = null;
    }

    LoopBackAuth.prototype.clearStorage = function() {
      props.forEach(function(name) {
        save(sessionStorage, name, null);
        save(localStorage, name, null);
      });
    };

    return new LoopBackAuth();

    // Note: LocalStorage converts the value to string
    // We are using empty string as a marker for null/undefined values.
    function save(storage, name, value) {
      try {
        var key = propsPrefix + name;
        if (value == null) value = '';
        storage[key] = value;
      } catch(err) {
        console.log('Cannot access local/session storage:', err);
      }
    }

    function load(name) {
      var key = propsPrefix + name;
      return localStorage[key] || sessionStorage[key] || null;
    }
  })
  .config(['$httpProvider', function($httpProvider) {
    $httpProvider.interceptors.push('LoopBackAuthRequestInterceptor');
  }])
  .factory('LoopBackAuthRequestInterceptor', [ '$q', 'LoopBackAuth',
    function($q, LoopBackAuth) {
      return {
        'request': function(config) {

          // filter out external requests
          var host = getHost(config.url);
          if (host && host !== urlBaseHost) {
            return config;
          }

          if (LoopBackAuth.accessTokenId) {
            config.headers[authHeader] = LoopBackAuth.accessTokenId;
          } else if (config.__isGetCurrentUser__) {
            // Return a stub 401 error for User.getCurrent() when
            // there is no user logged in
            var res = {
              body: { error: { status: 401 } },
              status: 401,
              config: config,
              headers: function() { return undefined; }
            };
            return $q.reject(res);
          }
          return config || $q.when(config);
        }
      }
    }])

  /**
   * @ngdoc object
   * @name lbServices.LoopBackResourceProvider
   * @header lbServices.LoopBackResourceProvider
   * @description
   * Use `LoopBackResourceProvider` to change the global configuration
   * settings used by all models. Note that the provider is available
   * to Configuration Blocks only, see
   * {@link https://docs.angularjs.org/guide/module#module-loading-dependencies Module Loading & Dependencies}
   * for more details.
   *
   * ## Example
   *
   * ```js
   * angular.module('app')
   *  .config(function(LoopBackResourceProvider) {
   *     LoopBackResourceProvider.setAuthHeader('X-Access-Token');
   *  });
   * ```
   */
  .provider('LoopBackResource', function LoopBackResourceProvider() {
    /**
     * @ngdoc method
     * @name lbServices.LoopBackResourceProvider#setAuthHeader
     * @methodOf lbServices.LoopBackResourceProvider
     * @param {string} header The header name to use, e.g. `X-Access-Token`
     * @description
     * Configure the REST transport to use a different header for sending
     * the authentication token. It is sent in the `Authorization` header
     * by default.
     */
    this.setAuthHeader = function(header) {
      authHeader = header;
    };

    /**
     * @ngdoc method
     * @name lbServices.LoopBackResourceProvider#setUrlBase
     * @methodOf lbServices.LoopBackResourceProvider
     * @param {string} url The URL to use, e.g. `/api` or `//example.com/api`.
     * @description
     * Change the URL of the REST API server. By default, the URL provided
     * to the code generator (`lb-ng` or `grunt-loopback-sdk-angular`) is used.
     */
    this.setUrlBase = function(url) {
      urlBase = url;
      urlBaseHost = getHost(urlBase) || location.host;
    };

    /**
     * @ngdoc method
     * @name lbServices.LoopBackResourceProvider#getUrlBase
     * @methodOf lbServices.LoopBackResourceProvider
     * @description
     * Get the URL of the REST API server. The URL provided
     * to the code generator (`lb-ng` or `grunt-loopback-sdk-angular`) is used.
     */
    this.getUrlBase = function() {
      return urlBase;
    };

    this.$get = ['$resource', function($resource) {
      return function(url, params, actions) {
        var resource = $resource(url, params, actions);

        // Angular always calls POST on $save()
        // This hack is based on
        // http://kirkbushell.me/angular-js-using-ng-resource-in-a-more-restful-manner/
        resource.prototype.$save = function(success, error) {
          // Fortunately, LoopBack provides a convenient `upsert` method
          // that exactly fits our needs.
          var result = resource.upsert.call(this, {}, this, success, error);
          return result.$promise || result;
        };
        return resource;
      };
    }];
  });

})(window, window.angular);
