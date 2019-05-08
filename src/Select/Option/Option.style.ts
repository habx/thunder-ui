import styled from 'styled-components'

import fontSizes from '../../fontSizes'
import theme from '../../theme'

export const OptionContainer = styled.div`
  transition: background-color ease-in 150ms;
  outline: none;
  cursor: pointer;
  user-select: none;
  white-space: nowrap;
  display: flex;
  align-items: center;
  font-size: ${fontSizes.regular};
  padding: ${({ compact }) => (compact ? 6 : 12)}px 18px;
  color: ${theme.get('neutralStronger', { dynamic: true })};

  i {
    vertical-align: middle;
    margin-right: 4px;
  }

  &:hover,
  &:focus,
  &[data-selected='true'] {
    background-color: ${theme.get('neutralLighter', { dynamic: true })};
  }

  &[data-disabled='true'] {
    opacity: 0.5;
    user-focus: none;
    &:hover,
    &:focus {
      background-color: transparent;
      cursor: auto;
    }
  }
`
