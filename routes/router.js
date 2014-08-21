var express = require( 'express' );

var router = express.Router();

require( './bills' ).addRoutesTo( router );

module.exports = router;
