import styled from 'styled-components'

import fontSizes from '../../fontSizes'
import colors from '../../colors'

export const OptionContainer = styled.div`
  transition: background-color ease-in 150ms;
  outline: none;
  cursor: pointer;
  user-select: none;
  white-space: nowrap;
  display: flex;
  align-items: center;
  font-size: ${fontSizes.regular};
  padding: 12px 18px;

  i {
    vertical-align: middle;
    margin-right: 4px;
  }

  &:hover,
  &:focus,
  &[data-selected="true"] {
    background-color: ${colors.snow};
  }
`
