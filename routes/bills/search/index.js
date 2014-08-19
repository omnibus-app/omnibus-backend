'use strict';

var TimesApi = require( 'nyt-congress-node' );
var sunlightApi = require( 'sunlight-congress-api' );
var parseBill = require( '../../../modules/parse-bill-id' );
var SUNLIGHT = process.env.SUNLIGHT_CONGRESS_KEY || 'test';
sunlightApi.init( SUNLIGHT );

module.exports = function ( req ) {
  var query = req.query.q;
  return sunlightApi
    .billsSearch()
    .fields( 'bill_id', 'bill_type', 'chamber', 'congress', 'enacted_as', 'history', 'last_action', 'nicknames', 'official_title', 'popular_title', 'search', 'short_title', 'sponsor', 'sponsor_id', 'urls' )
    .search( query )
    .call();
};
