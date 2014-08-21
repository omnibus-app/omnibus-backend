'use strict';

module.exports = ( function () {

  var config = {};

  function get ( key ) {
    return config.key;
  }

  function set ( keyOrObj, val ) {
    if ( val == null ) {
      Object.keys( keyOrObj ).forEach( function ( key ) {
        set( key, keyOrObj[key] );
      });
      return;
    }

    // help us avoid using this to pass around data
    if ( typeof val === 'object' ) {
      throw new TypeError( 'Configuration only accepts primitive values' );
    }

    config[keyOrObj] = val;
  }

  return {
    get: get,
    set: set
  };

})();
