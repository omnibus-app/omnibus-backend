'use strict';

var express = require('express');
var bills = require( '../api' ).bills;
var cacheInterceptor = require( './interceptor.js' );

function addRoutesTo ( router ) {
  router.get( '/bills/search', function ( req, res ) {
    cacheInterceptor( req, bills.search, req.query.q ).then( function ( data ) {
      res.json( data );
    });
  });

  router.get( '/bills/:id', function ( req, res ) {
    cacheInterceptor( req, bills.details, req.params.id ).then( function ( data ) {
      res.json( data );
    });
  });

  router.get( '/bills/:id/versions', function ( req, res ) {
    cacheInterceptor( req, bills.versions, req.params.id ).then( function ( data ) {
      res.json( data );
    });
  });

  router.get( '/bills/:id/amendments', function ( req, res ) {
    cacheInterceptor( req, bills.amendments, req.params.id ).then( function ( data ) {
      res.json( data );
    });
  });

  router.get( '/bills/:id/subjects', function ( req, res ) {
    cacheInterceptor( req, bills.subjects, req.params.id ).then( function ( data ) {
      res.json( data );
    });
  });

  router.get( '/bills/:id/votes', function ( req, res ) {
    cacheInterceptor( req, bills.votes, req.params.id ).then( function ( data ) {
      res.json( data );
    });
  });

  return router;
}

module.exports = {
  router: addRoutesTo( express.Router() ),
  addRoutesTo: addRoutesTo
};
