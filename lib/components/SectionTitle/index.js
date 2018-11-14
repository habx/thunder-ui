"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _styledComponents = _interopRequireWildcard(require("styled-components"));

var _theme = require("../../theme");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

const SectionTitle = _styledComponents.default.h3`
  display: flex;
  flex-direction: column;
  
  font-size: 14px;
  line-height: 18px;
  text-transform: uppercase;
  
  color: ${_theme.colors.maastrichtBlue};
    
  ${(_ref) => {
  let active = _ref.active;
  return active && _styledComponents.css`
    &::after {
      content: '';
      height: 3px;
      width: 100%;
      background-color: ${_theme.colors.maastrichtBlue};
    }
  `;
}}
`;
var _default = SectionTitle;
exports.default = _default;