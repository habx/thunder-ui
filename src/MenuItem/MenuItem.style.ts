import styled from 'styled-components'

import fontSizes from '../fontSizes'
import { getMainColor } from '../_internal/colors'

export const MenuItemContainer = styled.li`
  display: flex;
  align-items: flex-start;

  padding: 12px 16px;

  cursor: pointer;

  font-size: ${fontSizes.small};
  white-space: nowrap;
  color: ${props => getMainColor(props, { themeKey: 'neutral' })};

  transition: background-color ease-in-out 150ms;

  &:hover {
    background-color: ${props => getMainColor(props, { themeKey: 'neutralLight', customizable: false })};
  }

  &[data-disabled="true"] {
    pointer-events: none;
    opacity: 0.5;
  }
`

export const MenuItemContent = styled.div``

export const IconContainer = styled.div`
  margin-right: 12px;

  & > i {
    font-size: ${fontSizes.regular};
  }
`
