import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const NavBarItemTooltip = styled.span`
  max-width: 44px;
  overflow: hidden;
  position: absolute;
  top: 8px;
  left: 0;
  z-index: 50;
  height: calc(100% - 16px);
  line-height: calc(100% - 16px);
  border-radius: 22px;
  font-family: "Inter UI", sans-serif;
  font-size: 14px;
  white-space: nowrap;
  background-color: ${({ hovercolor }) => hovercolor};
  transition: max-width 150ms linear;
  
  display: flex;
  align-items: center;
`

const NavBarItemTooltipContent = styled.span`
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
  }
  
  &.active i {
    background-color: ${({ hovercolor }) => hovercolor};
    border-radius: 50%;
  }
  
  &:hover {
    ${NavBarItemTooltip} {
      max-width: 250px;
    }
  }
`

const NavBarItem = ({ icon, tooltip, hoverColor, ...props }) => (
  <NavBarItemContainer activeClassName='active' hovercolor={hoverColor} {...props}>
    {icon}
    {
      tooltip && (
        <Fragment>
          <NavBarItemTooltip hovercolor={hoverColor}>
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
  hoverColor: PropTypes.string,
}

NavBarItem.defaultProps = {
  hoverColor: 'transparent',
}

export default NavBarItem
