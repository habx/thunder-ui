import * as React from 'react'

import { withContext } from '../NavBar/context'

import NavBarItemProps from './NavBarItem.interface'
import { IconContainer, NavBarItemContainer, NavBarItemTooltip, NavBarItemTooltipContent } from './NavBarItem.style'

const NavBarItem: React.StatelessComponent<NavBarItemProps> = ({ icon, tooltip, activeBackgroundColor, ...props }) => (
  <NavBarItemContainer
    activeClassName='active'
    activebackgroundcolor={activeBackgroundColor}
    {...props}
  >
    <IconContainer>
      {icon}
    </IconContainer>
    {
      tooltip && (
        <React.Fragment>
          <NavBarItemTooltip activebackgroundcolor={activeBackgroundColor}>
            <IconContainer>
              {icon}
            </IconContainer>
            <NavBarItemTooltipContent>
              {tooltip}
            </NavBarItemTooltipContent>
          </NavBarItemTooltip>
        </React.Fragment>
      )
    }
  </NavBarItemContainer>
)

export default withContext(NavBarItem)
