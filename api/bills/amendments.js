'use strict';

var config = require( '../../modules/config' )

var TimesApi = require( 'nyt-congress-node' );

var nytKey =
  config.get('NYT_CONGRESS_KEY') ||
  process.env.NYT_CONGRESS_KEY;

var timesApi = new TimesApi( nytKey );

module.exports = function ( id ) {

  id = id.split( '-' );
  var congressNumber = id[0];
  var billNumber = id[1];

  return timesApi.billAmendments({
    billId: billNumber,
    congressNumber: congressNumber
  });
};
