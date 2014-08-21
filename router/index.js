var express = require( 'express' );
var router = express.Router();

require( './routes-bills' ).addRoutesTo( router );
require( './routes-votes' ).addRoutesTo( router );
require( './routes-congress' ).addRoutesTo( router );

module.exports = router;
