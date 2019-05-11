import * as React from 'react'

import useMergedContext from '../_internal/useMergedContext'
import { assert } from '../_internal/validityCheck'
import NavBarContext from '../NavBar/NavBar.context'

import NavBarItemProps from './NavBarItem.interface'
import {
  IconContainer,
  NavBarItemContainer,
  NavBarItemTooltip,
  NavBarItemTooltipContent,
} from './NavBarItem.style'

const NavBarItem: React.FunctionComponent<NavBarItemProps> = rawProps => {
  const {
    icon,
    tooltip,
    activeBackgroundColor,
    isInsideANavBar,
    ...props
  } = useMergedContext(NavBarContext, rawProps as NavBarItemProps)

  assert(
    isInsideANavBar,
    'ExpansionPanelItem should be used inside an ExpansionPanel'
  )

  return (
    <NavBarItemContainer
      data-testid="nav-bar-item"
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
