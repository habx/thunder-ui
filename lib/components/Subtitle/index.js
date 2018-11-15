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
  var data = (0, _taggedTemplateLiteral2.default)(["\n  font-size: 23px;\n  line-height: 29px;\n  color: ", ";\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

var Subtitle = _styledComponents.default.h2(_templateObject(), _theme.colors.maastrichtBlue);

var _default = Subtitle;
exports.default = _default;