import styled, { css } from 'styled-components'

import icons from './icons'

const FontIcon = styled.i`
  display: inline-block;
  font: normal normal normal 16px/1 'Habx';
  font-size: inherit;
  text-rendering: auto;
  text-transform: none;
  line-height: inherit;
  vertical-align: bottom;
  
  ${({ onClick }) => onClick && css`
    cursor: pointer;
    
    &:hover {
      opacity: 0.8;
    }
  `};
  
  &:before {
    content: "${({ icon }) => icons[icon] || icon}";
  }
`

export default FontIcon
