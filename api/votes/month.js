'use strict';

var timesApi = require( '../../modules/times-api' );

module.exports = function ( id ) {
  var year = id.split( '-' )[0];
  var month = id.split( '-' )[1];

  return timesApi.votesByDate({
    chamber: 'house',
    year: year,
    month: month
  });
};
