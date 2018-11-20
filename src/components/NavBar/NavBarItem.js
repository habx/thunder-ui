import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'

import { withContext } from './context'

const NavBarItemTooltip = styled.span`
  max-width: 44px;
  overflow: hidden;
  position: absolute;
  top: 8px;
  left: 0;
  z-index: 50;
  opacity: 0;
  height: calc(100% - 16px);
  line-height: calc(100% - 16px);
  border-radius: 22px;
  font-family: "Inter UI", sans-serif;
  font-size: 14px;
  white-space: nowrap;
  background-color: ${({ activebackgroundcolor }) => activebackgroundcolor};
  transition: max-width 150ms linear;
  
  display: flex;
  align-items: center;
`

const NavBarItemTooltipContent = styled.div`
  padding: 0 16px 0 8px;
`

const NavBarItemContainer = styled.div`
  position: relative;
  font-size: 12px;
  font-weight: bold;
  padding: 8px 0;
  color: #f9f9fb;
  
  i {
    padding: 12px;
    font-size: 20px;
    border-radius: 50%;
  }
  
  &.active i {
    background-color: ${({ activebackgroundcolor }) => activebackgroundcolor};
  }
  
  ${({ active }) => active && css`
    i {
      background-color: ${({ activebackgroundcolor }) => activebackgroundcolor};
    }
  `}
  
  &:hover {
    ${NavBarItemTooltip} {
      max-width: 250px;
      opacity: 1;
    }
  }
`

const NavBarItem = ({ icon, tooltip, activeBackgroundColor, ...props }) => (
  <NavBarItemContainer
    activeClassName='active'
    activebackgroundcolor={activeBackgroundColor}
    {...props}
  >
    {icon}
    {
      tooltip && (
        <Fragment>
          <NavBarItemTooltip activebackgroundcolor={activeBackgroundColor}>
            {icon}
            <NavBarItemTooltipContent>
              {tooltip}
            </NavBarItemTooltipContent>
          </NavBarItemTooltip>
        </Fragment>
      )
    }
  </NavBarItemContainer>
)

NavBarItem.propTypes = {
  icon: PropTypes.node.isRequired,
  tooltip: PropTypes.string.isRequired,
  activeBackgroundColor: PropTypes.string,
}

NavBarItem.defaultProps = {
  activeBackgroundColor: '',
}

export default withContext(NavBarItem)
