"use strict";

var _interopRequireDefault = require("/Users/jeandessane/habx/lib-client-backoffx/node_modules/@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _taggedTemplateLiteral2 = _interopRequireDefault(require("/Users/jeandessane/habx/lib-client-backoffx/node_modules/@babel/runtime/helpers/esm/taggedTemplateLiteral"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _colors = require("../../internal/colors");

function _templateObject() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  background: ", ";\n\n  padding: 2px 8px;\n  display: inline;\n  border-radius: 2px;\n\n  color: white;\n  font-weight: 600;\n  font-size: 14px;\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

var Tag = _styledComponents.default.div(_templateObject(), function (_ref) {
  var colorSeed = _ref.colorSeed;
  return (0, _colors.generateColorFromSeed)(colorSeed);
});

Tag.propTypes = {
  colorSeed: _propTypes.default.string.isRequired
};
var _default = Tag;
exports.default = _default;