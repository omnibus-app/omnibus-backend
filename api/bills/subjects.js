'use strict';

var parseBill = require( '../../modules/parse-bill-id' );
var config = require( '../../modules/config' );
var timesApi = require( '../../modules/times-api' );

module.exports = function ( id ) {
  var bill = parseBill( id );
  return timesApi.billSubjects({
    billId: bill.nytId,
    congressNumber: bill.congressNumber
  });
};
