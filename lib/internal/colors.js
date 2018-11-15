"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.generateColorFromSeed = void 0;

require("core-js/modules/es6.regexp.to-string");

var generateColorFromSeed = function generateColorFromSeed(seed) {
  function hashCode(str) {
    var hash = 0;

    for (var i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }

    return hash;
  }

  function intToRGB(i) {
    var c = (i & 0x00ffffff).toString(16).toUpperCase();
    return '00000'.substring(0, 6 - c.length) + c;
  }

  return "#".concat(intToRGB(hashCode(seed)));
};

exports.generateColorFromSeed = generateColorFromSeed;