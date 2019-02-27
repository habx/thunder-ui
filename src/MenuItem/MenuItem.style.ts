import styled from 'styled-components'

import fontSizes from '../fontSizes'
import { getMainColor } from '../_internal/colors'

export const MenuItemContainer = styled.li`
  display: flex;
  align-items: center;

  padding: 0 16px;

  cursor: pointer;

  font-size: ${fontSizes.small};
  white-space: nowrap;
  color: ${props => getMainColor(props, { themeKey: 'neutral' })};

  transition: background-color ease-in-out 150ms;

  &:hover {
    background-color: ${props => getMainColor(props, { themeKey: 'neutralLighter' })};
  }
`

export const MenuItemContent = styled.div`
  line-height: 3;
`

export const IconContainer = styled.div`
  margin-right: 8px;
`
