'use strict';

var parseBill = require( '../../modules/parse-bill-id' );
var config = require( '../../modules/config' );

var get = require( '../../modules/get' );
var Promise = require( 'bluebird' );

var sunlightApi = require( 'sunlight-congress-api' );
var sunlightKey =
  config.get( 'SUNLIGHT_CONGRESS_KEY' ) ||
  process.env.SUNLIGHT_CONGRESS_KEY;

sunlightApi.init( sunlightKey );

var getVersion = function ( version ) {
  return get( version.urls.html );
};

module.exports = function( id ) {
  var bill = parseBill( id );
  var sunlightResp;
  var gpoResp;
  return sunlightApi
    .bills()
    .filter( 'bill_id', bill.sunlightId )
    .fields( 'versions' )
    .call()
    .then( function ( resp ) {
      var sunlightResp = JSON.parse( resp ).results[0].versions;
      return Promise.all( sunlightResp.map( getVersion ) ).then( function ( gpoVersions ) {
        return sunlightResp.map( function ( version, i ) {
          version.content = gpoVersions[i][0].body;
          return version;
        });
      });
    });
};
