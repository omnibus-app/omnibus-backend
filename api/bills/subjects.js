'use strict';

var parseBill = require( '../../modules/parse-bill-id' );
var config = require( '../../modules/config' );
var nytKey =
  process.env.NYT_CONGRESS_KEY ||
  config.get('NYT_CONGRESS_KEY');

var timesApi = new require( 'nyt-congress-node' )( nytKey );

module.exports = function ( id ) {
  var bill = parseBill( id );
  return timesApi.billSubjects({
    billId: bill.billNumber,
    congressNumber: bill.congressNumber
  });
};
