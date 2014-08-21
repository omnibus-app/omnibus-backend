'use strict';

var express = require('express');
var router = express.Router();

var bills = require( '../../api' ).bills;

var cacheInterceptor = require( '../interceptor.js' );

router.get( '/search', function ( req, res ) {
  bills().search( req.query.q ).then( function ( data ) {
    res.json( data );
  });
});

router.get( '/:id/versions', function ( req, res ) {
  bills( req.params.id ).versions().then( function ( data ) {
    res.json( data );
  });
});

router.get( '/:id', function ( req, res ) {
  bills( req.params.id ).details().then( function ( data ) {
    res.json( data );
  });
});

router.get( '/:id/amendments', function ( req, res ) {
  bills( req.params.id ).amendments().then( function ( data ) {
    res.json( data );
  });
});

router.get( '/:id/subjects', function ( req, res ) {
  bills( req.params.id ).subjects().then( function ( data ) {
    res.json( data );
  });
});

router.get( '/:id/votes', function ( req, res ) {

  bills( req.params.id ).votes().then( function ( data ) {
    res.json( data );
  });
});

module.exports = router;
