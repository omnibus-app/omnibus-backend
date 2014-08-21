'use strict';

module.exports = {};

var bills = ( function () {

  var methods = {
    amendments: function() {

    },
    details: function () {

    },
    search: function () {

    },
    subjects: function () {

    },
    versions: function () {

    },
    votes: function () {

    },
  };

  return function ( id ) {
    return mixin( { _id: id }, methods );
  };
})();
