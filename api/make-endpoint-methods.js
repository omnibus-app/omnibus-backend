'use strict';

module.exports = function makeEndpointMethods ( endpoints ) {

  return Object.keys( endpoints ).reduce( function ( acc, key ) {
    acc[key] = function () {
      return endpoints[key]( this.id );
    };
    return acc;
  }, {} );

};
