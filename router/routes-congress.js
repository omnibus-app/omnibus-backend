'use strict';

var express = require( 'express' );
var congress = require( '../api' ).congress;
var cacheInterceptor = require( './interceptor.js' );

function addRoutesTo ( router ) {
  router.get( '/congress/:id/enacted', function ( req, res ) {
    cacheInterceptor( req, congress.enacted, req.params.id ).then( function ( data ) {
      res.json( data );
    });
  });

  return router;
}

module.exports = {
  router: addRoutesTo( express.Router() ),
  addRoutesTo: addRoutesTo
};
