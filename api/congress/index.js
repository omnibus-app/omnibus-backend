'use strict';

var makeEndpointMethods = require( '../make-endpoint-methods' );
var makeMethodMixin = require( '../make-method-mixin' );

var endpoints = {
  enacted: require( './enacted' )
};

var congressMethods = makeEndpointMethods( endpoints );
var congressMixin = makeMethodMixin( congressMethods );

var makeCongress = function ( id ) {
  return congressMixin({ id: id });
};

// attach methods so that they can be accessed directly
Object.keys( endpoints ).forEach( function ( method ) {
  makeCongress[method] = endpoints[method];
});

module.exports = makeCongress;

