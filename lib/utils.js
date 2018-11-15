"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.color = void 0;

var color = function color(colorName) {
  return function (_ref) {
    var theme = _ref.theme;
    return theme && theme.colors && theme.colors[colorName];
  };
};

exports.color = color;