'use strict';

var sunlightApi = require( 'sunlight-congress-api' );
var parseBill = require( '../../modules/parse-bill-id' );
var SUNLIGHT = process.env.SUNLIGHT_CONGRESS_KEY || 'test';
sunlightApi.init( SUNLIGHT );

module.exports = function ( query ) {
  return sunlightApi
    .billsSearch()
    .fields( 'bill_id', 'bill_type', 'chamber', 'congress', 'enacted_as', 'history', 'last_action', 'nicknames', 'official_title', 'popular_title', 'search', 'short_title', 'sponsor', 'sponsor_id', 'urls' )
    .filter( 'history.active', true )
    .search( query )
    .call();
};
