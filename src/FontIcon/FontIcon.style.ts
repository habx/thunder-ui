import styled, { css } from 'styled-components'

import theme from '../theme'

export const FontIconContainer = styled.span`
  font-family: 'Material Icons';
  font-weight: normal;
  font-style: normal;
  font-size: ${({ size }) => size}px;
  display: inline-block;
  line-height: 1;
  text-transform: none;
  letter-spacing: normal;
  word-wrap: normal;
  white-space: nowrap;
  direction: ltr;
  color: ${theme.get('inherit')};

  /* Support for all WebKit browsers. */
  -webkit-font-smoothing: antialiased;
  /* Support for Safari and Chrome. */
  text-rendering: optimizeLegibility;

  /* Support for Firefox. */
  -moz-osx-font-smoothing: grayscale;

  /* Support for IE. */
  font-feature-settings: 'liga';

  ${({ onClick, interactive }) =>
    (onClick || interactive) &&
    css`
      cursor: pointer;

      &:hover {
        opacity: 0.8;
      }
    `};
`
