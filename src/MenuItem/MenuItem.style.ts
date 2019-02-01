import styled from 'styled-components'

import colors from '../../colors'
import fontSizes from '../../fontSizes'

export const MenuItemContainer = styled.li`
  display: flex;
  align-items: center;

  padding: 0 16px;

  cursor: pointer;

  font-size: ${fontSizes.small};
  white-space: nowrap;
  color: ${colors.paynesGrey};

  transition: background-color ease-in-out 150ms;

  &:hover {
    background-color: ${colors.snow};
  }
`

export const MenuItemContent = styled.div`
  line-height: 3;
`

export const IconContainer = styled.div`
  margin-right: 8px;
`
