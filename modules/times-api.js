'use strict';

var config = require( './config' );
var nytKey =
  process.env.NYT_CONGRESS_KEY ||
  config.get('NYT_CONGRESS_KEY');

var NYTCongress = require( 'nyt-congress-node' );
var instance = new NYTCongress( nytKey );

module.exports = instance;
