"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _theme = require("../../theme");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Title = _styledComponents.default.h1`
  font-size: 54px;
  font-weight: bold;
  color: ${_theme.colors.maastrichtBlue};
  
`;
var _default = Title;
exports.default = _default;