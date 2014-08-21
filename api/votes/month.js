'use strict';

var config = require( '../../modules/config' );

var nytKey =
  process.env.NYT_CONGRESS_KEY ||
  config.get('NYT_CONGRESS_KEY');

var timesApi = new require( 'nyt-congress-node' )( nytKey );

module.exports = function ( id ) {
  var year = id.split( '-' )[0];
  var month = id.split( '-' )[1];

  return timesApi.votesByDate({
    chamber: 'house',
    year: year,
    month: month
  });
};
