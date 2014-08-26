'use strict';

var parseBill = require( '../../modules/parse-bill-id' );
var sunlightApi = require( '../../modules/sunlight-api' );

module.exports = function ( query ) {
  return sunlightApi()
    .billsSearch()
    .fields( 'bill_id', 'bill_type', 'chamber', 'congress', 'enacted_as', 'history', 'last_action', 'nicknames', 'official_title', 'popular_title', 'search', 'short_title', 'sponsor', 'sponsor_id', 'urls' )
    .filter( 'history.active', true )
    .search( query.q )
    .call();
};
