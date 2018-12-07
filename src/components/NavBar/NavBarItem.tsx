import * as React from 'react'

import { withContext } from './context'

import NavBarItemProps from './NavBarItem.interface'
import { NavBarItemContainer, NavBarItemTooltip, NavBarItemTooltipContent } from './NavBarItem.style'

const NavBarItem: React.StatelessComponent<NavBarItemProps> = ({ icon, tooltip, activeBackgroundColor, ...props }) => (
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

NavBarItem.defaultProps = {
  activeBackgroundColor: '',
}

export default withContext(NavBarItem)
