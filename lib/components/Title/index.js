"use strict";

var _interopRequireDefault = require("/Users/jeandessane/habx/lib-client-backoffx/node_modules/@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _taggedTemplateLiteral2 = _interopRequireDefault(require("/Users/jeandessane/habx/lib-client-backoffx/node_modules/@babel/runtime/helpers/esm/taggedTemplateLiteral"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _theme = require("../../theme");

function _templateObject() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  font-size: 54px;\n  font-weight: bold;\n  color: ", ";\n  \n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

var Title = _styledComponents.default.h1(_templateObject(), _theme.colors.maastrichtBlue);

var _default = Title;
exports.default = _default;