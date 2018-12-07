import React from 'react'
import styled, { css } from 'styled-components'
import colorUtil from 'color'
import tag from 'clean-tag'

import { fontSizes, colors } from '../../../theme'
import { withContext } from '../context'

import TabsItemProps from './TabsItem.interface'

const prepareProps = props => {
  const activeColor = props.activeColor || colors.trueBlue
  const color = props.color || colorUtil(colors.maastrichtBlue).fade(0.28).toString()
  return ({
    color,
    activeColor,
    borderBottom: `3px solid ${activeColor}`,
    hoverColor: activeColor || props.hoverColor,
    activeClassName: 'active',
    className: `${props.className} ${props.active ? 'active' : ''}`,
  })
}

const StyledTabsItem = styled(tag).attrs(prepareProps)`
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
  closed: false,
}

export default withContext(TabsItem)
