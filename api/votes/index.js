'use strict';

var endpoints = {
  month: require( './month' )
};

var votesMixin = ( function () {
  var methods = Object.keys( endpoints ).reduce( function ( acc, key ) {
    acc[key] = function () {
      return endpoints[key]( this.id );
    };
    return acc;
  }, {} );

  return function ( obj ) {
    Object.keys( methods ).forEach( function ( key ) {
      obj[key] = methods[key];
    });
    return obj;
  };

})();

module.exports = function ( id ) {
  return votesMixin({ id: id });
};
