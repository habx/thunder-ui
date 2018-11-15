"use strict";

var _interopRequireDefault = require("/Users/jeandessane/habx/lib-client-backoffx/node_modules/@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _objectWithoutProperties2 = _interopRequireDefault(require("/Users/jeandessane/habx/lib-client-backoffx/node_modules/@babel/runtime/helpers/esm/objectWithoutProperties"));

var _taggedTemplateLiteral2 = _interopRequireDefault(require("/Users/jeandessane/habx/lib-client-backoffx/node_modules/@babel/runtime/helpers/esm/taggedTemplateLiteral"));

var _react = _interopRequireDefault(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

function _templateObject2() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  position: relative;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 12px;\n  font-weight: bold;\n  padding: 8px 0;\n  width: 100%;\n  color: #f9f9fb;\n  i {\n    padding: 12px;\n    font-size: 20px;\n  }\n  &.active i {\n    background-color: ", ";\n    border-radius: 100%;\n  }\n  &:hover {\n      ", " {\n        display: block;\n        background-color: ", ";\n      }\n     i {\n        background-color: ", ";\n        border-radius: 100% 0 0 100% !important;\n      }\n  }\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  display: none;\n  position: absolute;\n  left: 50px;\n  z-index: 50;\n  height: 44px;\n  line-height: 44px;\n  padding: 0 16px 0 8px;\n  border-top-right-radius: 100px;\n  border-bottom-right-radius: 100px;\n  font-family: \"Inter UI\", sans-serif;\n  font-size: 14px;\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

var NavBarItemTooltip = _styledComponents.default.span(_templateObject());

var NavBarItemContainer = _styledComponents.default.div(_templateObject2(), function (_ref) {
  var hovercolor = _ref.hovercolor;
  return hovercolor;
}, NavBarItemTooltip, function (_ref2) {
  var hovercolor = _ref2.hovercolor;
  return hovercolor;
}, function (_ref3) {
  var hovercolor = _ref3.hovercolor;
  return hovercolor;
});

var NavBarItem = function NavBarItem(_ref4) {
  var icon = _ref4.icon,
      tooltip = _ref4.tooltip,
      hoverColor = _ref4.hoverColor,
      props = (0, _objectWithoutProperties2.default)(_ref4, ["icon", "tooltip", "hoverColor"]);
  return _react.default.createElement(NavBarItemContainer, Object.assign({
    activeClassName: "active",
    hovercolor: hoverColor
  }, props), icon, _react.default.createElement(NavBarItemTooltip, null, tooltip));
};

NavBarItem.defaultProps = {
  hoverColor: 'transparent'
};
var _default = NavBarItem;
exports.default = _default;