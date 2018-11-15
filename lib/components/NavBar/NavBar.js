"use strict";

var _interopRequireDefault = require("/Users/jeandessane/habx/lib-client-backoffx/node_modules/@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _taggedTemplateLiteral2 = _interopRequireDefault(require("/Users/jeandessane/habx/lib-client-backoffx/node_modules/@babel/runtime/helpers/esm/taggedTemplateLiteral"));

var _react = _interopRequireDefault(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

function _templateObject3() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  margin-top: 32px;\n"]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  font-family: Habx;\n  padding: 32px 0;\n  text-align: center;\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n    background-color: ", ";\n    color: white;\n    height: 100vh;\n    width: 65px;\n    a {\n      color: inherit;\n      &:hover {\n        color: inherit;\n        text-decoration: none;\n      }\n    }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

var NavBarContainer = _styledComponents.default.nav(_templateObject(), function (_ref) {
  var backgroundcolor = _ref.backgroundcolor;
  return backgroundcolor;
});

var NavBarTitle = _styledComponents.default.h4(_templateObject2());

var NavBarItemsContainer = _styledComponents.default.div(_templateObject3());

var NavBar = function NavBar(_ref2) {
  var title = _ref2.title,
      children = _ref2.children,
      backgroundColor = _ref2.backgroundColor;
  return _react.default.createElement(NavBarContainer, {
    backgroundcolor: backgroundColor
  }, _react.default.createElement(NavBarTitle, null, title), _react.default.createElement(NavBarItemsContainer, null, children));
};

NavBar.defaultProps = {
  backgroundColor: 'transparent'
};
var _default = NavBar;
exports.default = _default;