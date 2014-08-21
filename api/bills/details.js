'use strict';

var config = require( '../../modules/config' )

var TimesApi = require( 'nyt-congress-node' );
var NYT = config.get('NYT_CONGRESS_KEY') || process.env.NYT_CONGRESS_KEY || 'test';
var timesApi = new TimesApi( NYT );

module.exports = function ( id ) {
  id = id.split( '-' );
  var congressNumber = id[0];
  var billNumber = id[1];

  var timesReq = timesApi.billDetails({
    billId: billNumber,
    congressNumber: congressNumber
  });

  return timesReq;
};
