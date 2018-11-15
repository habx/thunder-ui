import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const NavBarItemTooltip = styled.span`
  display: none;
  position: absolute;
  left: 50px;
  z-index: 50;
  height: 44px;
  line-height: 44px;
  padding: 0 16px 0 8px;
  border-top-right-radius: 100px;
  border-bottom-right-radius: 100px;
  font-family: "Inter UI", sans-serif;
  font-size: 14px;
`

const NavBarItemContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: bold;
  padding: 8px 0;
  width: 100%;
  color: #f9f9fb;
  i {
    padding: 12px;
    font-size: 20px;
  }
  &.active i {
    background-color: ${({ hovercolor }) => hovercolor};
    border-radius: 100%;
  }
  &:hover {
      ${NavBarItemTooltip} {
        display: block;
        background-color: ${({ hovercolor }) => hovercolor};
      }
     i {
        background-color: ${({ hovercolor }) => hovercolor};
        border-radius: 100% 0 0 100% !important;
      }
  }
`

const NavBarItem = ({ icon, tooltip, hoverColor, ...props }) => (
  <NavBarItemContainer activeClassName='active' hovercolor={hoverColor} {...props}>
    {icon}
    <NavBarItemTooltip>{tooltip}</NavBarItemTooltip>
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
