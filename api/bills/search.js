'use strict';

var parseBill = require( '../../modules/parse-bill-id' );
var config = require( '../../modules/config' );

var sunlightApi = require( 'sunlight-congress-api' );
var sunlightKey =
  config.get('SUNLIGHT_CONGRESS_KEY') ||
  process.env.SUNLIGHT_CONGRESS_KEY;
sunlightApi.init( sunlightKey );

module.exports = function ( query ) {
  return sunlightApi
    .billsSearch()
    .fields( 'bill_id', 'bill_type', 'chamber', 'congress', 'enacted_as', 'history', 'last_action', 'nicknames', 'official_title', 'popular_title', 'search', 'short_title', 'sponsor', 'sponsor_id', 'urls' )
    .filter( 'history.active', true )
    .search( query )
    .call();
};
