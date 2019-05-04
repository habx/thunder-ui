import tag from 'clean-tag'
import * as React from 'react'
import styled, { css } from 'styled-components'

import { getMainColor } from '../_internal/colors'
import useMergedContext from '../_internal/useMergedContext'
import fontSizes from '../fontSizes'
import { Context } from '../Tabs/context'

import TabsItemProps from './TabsItem.interface'

const prepareProps = props => {
  const activeColor = getMainColor(props, {
    propName: 'activeColor',
    themeKey: 'primary',
  })
  const color = getMainColor(props, { themeKey: 'neutral' })

  return {
    color,
    activeColor,
    hoverColor: activeColor || props.hoverColor,
    activeClassName: 'active',
    className: `${props.className} ${props.active ? 'active' : ''}`,
  }
}

const StyledTabsItem = styled(tag).attrs(prepareProps)`
  display: flex;
  position: relative;
  padding: 16px 8px;
  margin: 0 8px;
  font-size: ${fontSizes.regular};
  color: ${({ color }) => color};
  transition: all 150ms ease-in-out;
  white-space: nowrap;

  ${({ closed }) =>
    closed &&
    css`
      opacity: 0.7;
      text-decoration: line-through;
    `}

  &.active {
    color: ${({ activeColor }) => activeColor};

    &::after {
      width: 100%;
      left: 0;
      transition: all 250ms ease-in-out;
    }
  }

  &:hover {
    text-decoration: none;
    color: ${({ hoverColor }) => hoverColor};
  }

  &::after {
    content: '';

    width: 0;
    height: 3px;

    position: absolute;
    bottom: 0;
    left: 50%;

    background-color: ${({ activeColor }) => activeColor};
  }
`

const TabsItem: React.StatelessComponent<TabsItemProps> = rawProps => {
  const props = useMergedContext(Context, rawProps)

  return (
    <StyledTabsItem
      blacklist={['activeColor', 'hoverColor', 'closed']}
      {...props}
    />
  )
}

TabsItem.defaultProps = {
  activeColor: null,
  hoverColor: null,
  closed: false,
}

export default TabsItem
