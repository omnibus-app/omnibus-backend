'use strict';

var Promise = require( 'bluebird' );
var parseBill = require( '../../modules/parse-bill-id' );
var sunlightAll = require( '../../modules/sunlight-all' );
var timesApi = require( '../../modules/times-api' );

function parseMonth ( num ) {
  var result = String( num + 1 );
  if ( result.length === 1 ) {
    result = '0' + result;
  }
  return result;
}

function parseYear ( num ) {
  return String( num + 1900 );
}

function yearToCongress ( year ) {
  return Math.floor( 1 + ( year - 1789 ) / 2 );
}

function congressToYear ( congress, session ) {
  return ( ( congress - 1 ) * 2 ) + 1789 + ( session - 1 );
}

function numbersFromString ( str ) {
  return str.match( /\d/g ).join( '' );
}

function matches ( objA, objB ) {
  return Object.keys( objA ).every( function ( key ) {
    return objA[key] == objB[key];
  });
}

function findWhere ( obj, arr ) {
  var i = 0;
  while ( i < arr.length ) {
    if ( matches( obj, arr[i] ) ) {
      return arr[i];
    }
    i += 1;
  }
  return null;
}

function sunlightRollToNytObj ( rollId ) {
  rollId = rollId.split( '-' );
  var year = rollId[1];
  var roll = numbersFromString( rollId[0] );
  var congress = yearToCongress( year );
  var session;
  if ( Number( year ) % 2 === 0 ) {
    session = 2;
  } else {
    session = 1;
  }
  return {
    session: session,
    congress: congress,
    roll_call: roll
  };
}

function findMatchingVote ( sunlightVote, nytVotes ) {
  if ( !sunlightVote.roll_id ) {
    return null;
  }
  var matchObj = sunlightRollToNytObj( sunlightVote.roll_id );
  return findWhere( matchObj, nytVotes );
}

function combineVotes ( sunlightVotes, nytVotes ) {
  var results = sunlightVotes.slice();
  return results.map( function ( item ) {
    var vote = findMatchingVote( item, nytVotes );
    item.vote = vote;
    return item;
  });
}

function staggeredVoteMonthRequests ( voteMonths ) {
  var times = timesApi();
  var len = voteMonths.length;
  var data = [];

  return new Promise( function ( resolve, reject ) {

    function handleResponse ( resp ) {
      data.push( resp );
      if ( data.length === len ) {
        resolve( data );
      }
    }

    function makeTwoRequests () {
      var first = voteMonths.pop();
      var second = voteMonths.pop();

      if ( first ) {
        times.votesByDate({
          chamber: 'house',
          year: first.split( '-' )[0],
          month: first.split( '-' )[1]
        }).then( handleResponse )
        .catch( reject );
      }

      if ( second ) {
        times.votesByDate({
          chamber: 'house',
          year: second.split( '-' )[0],
          month: second.split( '-' )[1]
        }).then( handleResponse )
        .catch( reject );
      }

      if ( voteMonths.length ) {
        setTimeout( makeTwoRequests, 1050 );
      }
    }

    if ( voteMonths.length ) {
      makeTwoRequests();
    } else {
      resolve();
    }

  });
}

module.exports = function( id ) {
  var bill = parseBill( id );
  var filters = {
    'bill_id': bill.sunlightId
  };

  return sunlightAll( 'votes', filters ).then( function ( sunlightVotes ) {

    var voteMonths = sunlightVotes.map( function ( vote ) {
      return new Date( vote.voted_at );
    })
    .reduce( function ( acc, date ) {
      var year = parseYear( date.getYear() );
      var month = parseMonth( date.getMonth() );
      var key = year + '-' + month;
      if ( !acc[key] ) {
        acc[key] = true;
      }
      return acc;
    }, {} );

    if ( voteMonths.length === 0 ) {
      return [];
    }

    return staggeredVoteMonthRequests( Object.keys( voteMonths ) )
    .then( function ( responses ) {
      var nytVotes = responses.reduce( function ( acc, response, i ) {
        return acc.concat( response.results.votes );
      }, [] );
      return combineVotes( sunlightVotes, nytVotes );
    });
  });

};
