'use strict';

var endpoints = {
  amendments: require( './amendments' ),
  details: require( './details' ),
  search: require( './search' ),
  subjects: require( './subjects' ),
  versions: require( './versions' ),
  votes: require( './votes' )
};

var billMixin = ( function () {
  var methods = Object.keys( endpoints ).reduce( function ( acc, key ) {
    acc[key] = function () {
      return endpoints[key]( this.id );
    };
    return acc;
  }, {} );

  // special case.
  methods.search = function ( query ) {
    return endpoints.search( query );
  };

  return function ( obj ) {
    Object.keys( methods ).forEach( function ( key ) {
      obj[key] = methods[key];
    });
    return obj;
  };

})();

module.exports = function ( id ) {
  return billMixin({ id: id });
};
