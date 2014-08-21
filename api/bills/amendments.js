'use strict';

var config = require( '../../modules/config' );
var parseBill = require( '../../modules/parse-bill-id' );
var nytKey =
  config.get('NYT_CONGRESS_KEY') ||
  process.env.NYT_CONGRESS_KEY;

var timesApi = new require( 'nyt-congress-node' )( nytKey );

module.exports = function ( id ) {
  var bill = parseBill( id );
  return timesApi.billAmendments({
    billId: bill.billId,
    congressNumber: bill.congressNumber
  });
};
