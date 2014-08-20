'use strict';

var express = require('express');
var router = express.Router();

var month = require( './month' );

var cacheInterceptor = require( '../interceptor.js' );

router.get( '/:id', function ( req, res ) {
  cacheInterceptor( req, month ).then( function ( data ) {
    res.json( data );
  });
});

module.exports = router;
