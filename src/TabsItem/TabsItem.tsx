import * as React from 'react'
import styled, { css } from 'styled-components'

import fontSizes from '../fontSizes'
import { getMainColor } from '../_internal/colors'

import { withContext } from '../Tabs/context'

import TabsItemProps from './TabsItem.interface'

const prepareProps = props => {
  const activeColor = getMainColor(props, { propName: 'activeColor', themeKey: 'primary' })
  const color = getMainColor(props, { themeKey: 'neutral' })

  return ({
    color,
    activeColor,
    borderBottom: `3px solid ${activeColor}`,
    hoverColor: activeColor || props.hoverColor,
    activeClassName: 'active',
    className: `${props.className} ${props.active ? 'active' : ''}`
  })
}

const StyledTabsItem = styled.div.attrs(prepareProps)`
  display: flex;
  padding: 16px 8px;
  margin: 0 8px;
  font-size: ${fontSizes.regular};
  color: ${({ color }) => color};
  transition: all 150ms ease-in-out;
  border-bottom: 3px solid transparent;
  white-space: nowrap;

  ${({ closed }) => closed && css`
    opacity: 0.7;
    text-decoration: line-through;
  `}

  &.active {
    border-bottom: ${({ borderBottom }) => borderBottom};
    color: ${({ activeColor }) => activeColor};
  }
  &:hover {
    text-decoration: none;
    color: ${({ hoverColor }) => hoverColor};
  }
`

const TabsItem: React.StatelessComponent<TabsItemProps> = props => (
  <StyledTabsItem blacklist={['activeColor', 'borderBottom', 'hoverColor', 'closed']} {...props} />
)

TabsItem.defaultProps = {
  activeColor: null,
  hoverColor: null,
  closed: false
}

export default withContext(TabsItem)
