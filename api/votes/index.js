'use strict';

var makeEndpointMethods = require( '../make-endpoint-methods' );
var makeMethodMixin = require( '../make-method-mixin' );

var endpoints = {
  month: require( './month' )
};

var votesMethods = makeEndpointMethods( endpoints );
var votesMixin = makeMethodMixin( votesMethods );

var makeVotes = function ( id ) {
  return votesMixin({ id: id });
};

// attach methods so that they can be accessed directly
Object.keys( endpoints ).forEach( function ( method ) {
  makeVotes[method] = endpoints[method];
});

module.exports = makeVotes;


