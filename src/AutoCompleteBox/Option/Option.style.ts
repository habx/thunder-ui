import styled from 'styled-components'

import fontSizes from '../../fontSizes'
import theme from '../../theme'

export const OptionContainer = styled.li`
  transition: background-color ease-in 150ms;
  outline: none;
  cursor: pointer;
  user-select: none;
  white-space: nowrap;
  display: flex;
  align-items: center;
  font-size: ${fontSizes.regular};
  padding: 12px 18px;
  color: ${theme.get('neutralStronger', { dynamic: true })};
`
