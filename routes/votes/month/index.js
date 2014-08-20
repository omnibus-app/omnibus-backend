'use strict';

var TimesApi = require( 'nyt-congress-node' );
var NYT = process.env.NYT_CONGRESS_KEY || 'test';
var timesApi = new TimesApi( NYT );

module.exports = function ( req ) {
  var year = req.params.id.split( '-' )[0];
  var month = req.params.id.split( '-' )[1];

  return timesApi.votesByDate({
    chamber: 'house',
    year: year,
    month: month
  });
};
