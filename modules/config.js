'use strict';

module.exports = ( function () {

  var config = {
    NYT_CONGRESS_KEY: 'NOT_FOUND',
    SUNLIGHT_CONGRESS_KEY: 'NOT_FOUND'
  };

  function get ( key ) {
    return config[key];
  }

  function set ( keyOrObj, val ) {
    if ( val == null ) {
      Object.keys( keyOrObj ).forEach( function ( key ) {
        set( key, keyOrObj[key] );
      });
      return;
    }

    // prevent using this to pass around data
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
