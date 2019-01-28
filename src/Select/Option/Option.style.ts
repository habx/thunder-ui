import styled from 'styled-components'

import fontSizes from '../../fontSizes'
import colors from '../../colors'

export const OptionContainer = styled.div`
  transition: color ease-in 150ms;
  outline: none;
  cursor: pointer;
  user-select: none;
  margin-bottom: 8px;
  font-size: ${fontSizes.small};

  i {
    vertical-align: middle;
    margin-right: 4px;
  }

  &:hover,
  &:focus,
  &[data-selected="true"] {
    color: ${colors.internationalOrange};
  }
`
