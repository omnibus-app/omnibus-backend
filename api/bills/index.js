'use strict';

var makeEndpointMethods = require( '../make-endpoint-methods' );
var makeMethodMixin = require( '../make-method-mixin' );

var endpoints = {
  amendments: require( './amendments' ),
  details: require( './details' ),
  search: require( './search' ),
  subjects: require( './subjects' ),
  versions: require( './versions' ),
  votes: require( './votes' )
};

var billMethods = makeEndpointMethods( endpoints );

// special case
billMethods.search = function ( query ) {
  return endpoints.search( query );
};

var billMixin = makeMethodMixin( billMethods );

var makeBill = function ( id ) {
  return billMixin({ id: id });
};

// attach methods so that they can be accessed directly
Object.keys( endpoints ).forEach( function ( method ) {
  makeBill[method] = endpoints[method];
});

module.exports = makeBill;
