import * as React from 'react'

import useMergedContext from '../_internal/useMergedContext'
import { Context } from '../NavBar/context'

import NavBarItemProps from './NavBarItem.interface'
import {
  IconContainer,
  NavBarItemContainer,
  NavBarItemTooltip,
  NavBarItemTooltipContent,
} from './NavBarItem.style'

const NavBarItem: React.FunctionComponent<NavBarItemProps> = rawProps => {
  const { icon, tooltip, activeBackgroundColor, ...props } = useMergedContext(
    Context,
    rawProps
  )

  return (
    <NavBarItemContainer
      activeClassName="active"
      activebackgroundcolor={activeBackgroundColor}
      {...props}
    >
      <IconContainer>{icon}</IconContainer>
      {tooltip && (
        <React.Fragment>
          <NavBarItemTooltip activebackgroundcolor={activeBackgroundColor}>
            <IconContainer>{icon}</IconContainer>
            <NavBarItemTooltipContent>{tooltip}</NavBarItemTooltipContent>
          </NavBarItemTooltip>
        </React.Fragment>
      )}
    </NavBarItemContainer>
  )
}

export default NavBarItem
