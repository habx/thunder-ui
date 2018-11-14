"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.color = void 0;

const color = colorName => (_ref) => {
  let theme = _ref.theme;
  return theme && theme.colors && theme.colors[colorName];
};

exports.color = color;