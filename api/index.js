// module.exports = {
//   bills: require( './bills' )
//   // votes: require( './votes' ),
//   // congress: require( './congress' )
// }

'use strict';

var api = {};

var billMixin = ( function () {
  var _methods = require( './bill' );
  var methods = Object.keys( methods ).reduce( function ( acc, key ) {
    acc[key] = function () {
      return methods[key].call( null, this.id );
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

api.bills = function ( id ) {
  return billMixin({ id: id });
};

module.exports = api;
