'use strict';

var config = require( '../../modules/config' );
var parseBill = require( '../../modules/parse-bill-id' );
var timesApi = require( '../../modules/times-api' );

module.exports = function ( id ) {
  var bill = parseBill( id );
  return timesApi().billDetails({
    billId: bill.nytId,
    congressNumber: bill.congressNumber
  });
};
