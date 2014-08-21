'use strict';

var sunlightAll = require( '../../modules/sunlight-all' );

module.exports = function ( id ) {

  var filters = {
    'congress': id,
    'history.enacted': true
  };

  return sunlightAll( 'bills', filters );
};
