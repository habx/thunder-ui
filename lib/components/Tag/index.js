"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _colors = require("../../utils/colors");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Tag = _styledComponents.default.div`
  background: ${(_ref) => {
  let colorSeed = _ref.colorSeed;
  return (0, _colors.generateColorFromSeed)(colorSeed);
}};

  padding: 2px 8px;
  display: inline;
  border-radius: 2px;

  color: white;
  font-weight: 600;
  font-size: 14px;
`;
Tag.propTypes = {
  colorSeed: _propTypes.default.string.isRequired
};
var _default = Tag;
exports.default = _default;