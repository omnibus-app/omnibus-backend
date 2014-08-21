'use strict';

var config = require( './config' );
var sunlightApi = require( 'sunlight-congress-api' );
var sunlightKey =
  process.env.SUNLIGHT_CONGRESS_KEY ||
  config.get( 'SUNLIGHT_CONGRESS_KEY' );

sunlightApi.init( sunlightKey );

module.exports = sunlightApi;
