'use strict';

var sunlightAll = require( '../../modules/sunlight-all' );

module.exports = function ( id ) {
  return sunlightAll( 'bills', {
    'congress': id,
    'history.enacted': true
  });
};
