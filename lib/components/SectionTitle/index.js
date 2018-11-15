"use strict";

var _interopRequireWildcard = require("/Users/jeandessane/habx/lib-client-backoffx/node_modules/@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("/Users/jeandessane/habx/lib-client-backoffx/node_modules/@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _taggedTemplateLiteral2 = _interopRequireDefault(require("/Users/jeandessane/habx/lib-client-backoffx/node_modules/@babel/runtime/helpers/esm/taggedTemplateLiteral"));

var _styledComponents = _interopRequireWildcard(require("styled-components"));

var _theme = require("../../theme");

function _templateObject2() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n    &::after {\n      content: '';\n      height: 3px;\n      width: 100%;\n      background-color: ", ";\n    }\n  "]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  display: flex;\n  flex-direction: column;\n  \n  font-size: 14px;\n  line-height: 18px;\n  text-transform: uppercase;\n  \n  color: ", ";\n    \n  ", "\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

var SectionTitle = _styledComponents.default.h3(_templateObject(), _theme.colors.maastrichtBlue, function (_ref) {
  var active = _ref.active;
  return active && (0, _styledComponents.css)(_templateObject2(), _theme.colors.maastrichtBlue);
});

var _default = SectionTitle;
exports.default = _default;