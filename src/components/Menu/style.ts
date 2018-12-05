import * as React from 'react'
import styled from 'styled-components'

import { shadows, borderRadius, colors, fontSizes } from '../../theme'

const prepareProps = ({ position }) => ({
  left: position === 'left' ? '4px' : 'unset',
  right: position === 'right' ? '4px' : 'unset',
})

interface MenuContainerProps extends React.HTMLAttributes<Element> {
  position: 'left' | 'right'
}

export const MenuContainer: React.FC<MenuContainerProps> = styled.div.attrs(prepareProps)`
  position: absolute;
  top: calc(100% + 4px);
  left: ${({ left }) => left};
  right: ${({ right }) => right};
  opacity: 0;
  background-color: white;

  transition: opacity ease-in-out 150ms;

  &[data-open="true"] {
    opacity: 1;
  }
`

export const MenuContent = styled.ul`
  box-shadow: ${shadows.light};
  border-radius: ${borderRadius.narrow};
  padding: 8px 0;

  list-style-type: none;
`

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
