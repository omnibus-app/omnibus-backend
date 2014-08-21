'use strict';

var config = require( './config' );
var NYTCongress = require( 'nyt-congress-node' );

module.exports = function () {

  var nytKey =
    process.env.NYT_CONGRESS_KEY ||
    config.get('NYT_CONGRESS_KEY');
  return new NYTCongress( nytKey );

};
