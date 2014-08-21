'use strict';

var express = require( 'express' );
var votes = require( '../api' ).votes;
var cacheInterceptor = require( './interceptor.js' );

function addRoutesTo ( router ) {
  router.get( '/votes/:id', function ( req, res ) {
    cacheInterceptor( req, votes.month, req.params.id ).then( function ( data ) {
      res.json( data );
    });
  });

  return router;
}

module.exports = {
  router: addRoutesTo( express.Router() ),
  addRoutesTo: addRoutesTo
};
