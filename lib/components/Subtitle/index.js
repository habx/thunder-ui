"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _theme = require("../../theme");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Subtitle = _styledComponents.default.h2`
  font-size: 23px;
  line-height: 29px;
  color: ${_theme.colors.maastrichtBlue};
`;
var _default = Subtitle;
exports.default = _default;