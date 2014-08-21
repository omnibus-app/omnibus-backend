'use strict';

module.exports = function makeMethodMixin ( methods ) {
  return function ( obj ) {
    Object.keys( methods ).forEach( function ( key ) {
      obj[key] = methods[key];
    });
    return obj;
  };
};
