import React from 'react'
import styled, { css } from 'styled-components'


const FontIcon = styled.i`
  font-family: 'Material Icons';
  font-weight: normal;
  font-style: normal;
  font-size: 24px;  /* Preferred icon size */
  display: inline-block;
  line-height: 1;
  text-transform: none;
  letter-spacing: normal;
  word-wrap: normal;
  white-space: nowrap;
  direction: ltr;

  /* Support for all WebKit browsers. */
  -webkit-font-smoothing: antialiased;
  /* Support for Safari and Chrome. */
  text-rendering: optimizeLegibility;

  /* Support for Firefox. */
  -moz-osx-font-smoothing: grayscale;

  /* Support for IE. */
  font-feature-settings: 'liga';
  
  ${({ onClick }) => onClick && css`
    cursor: pointer;
    
    &:hover {
      opacity: 0.8;
    }
  `};
`

export default ({ icon, ...props }) =>
  <FontIcon {...props}>{icon}</FontIcon>
