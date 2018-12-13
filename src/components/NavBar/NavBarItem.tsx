import * as React from 'react'

import { withContext } from './context'

import NavBarItemProps from './NavBarItem.interface'
import { NavBarItemContainer, NavBarItemTooltip, NavBarItemTooltipContent } from './NavBarItem.style'

const NavBarItem: React.FunctionComponent<NavBarItemProps> = ({ icon, tooltip, activeBackgroundColor, ...props }) => (
  <NavBarItemContainer
    activeClassName='active'
    activebackgroundcolor={activeBackgroundColor}
    {...props}
  >
    {icon}
    {
      tooltip && (
        <React.Fragment>
          <NavBarItemTooltip activebackgroundcolor={activeBackgroundColor}>
            {icon}
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
