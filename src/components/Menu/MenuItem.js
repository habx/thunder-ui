import React from 'react'
import PropTypes from 'prop-types'

import { MenuItemContainer, MenuItemContent, IconContainer } from './style'

const MenuItem = ({ children, icon, ...props }) => (
  <MenuItemContainer {...props}>
    { icon && <IconContainer>{ icon }</IconContainer>}
    <MenuItemContent>
      { children }
    </MenuItemContent>
  </MenuItemContainer>
)

MenuItem.propTypes = {
  children: PropTypes.node,
  icon: PropTypes.node,
}

MenuItem.defaultProps = {
  children: null,
  icon: null,
}

export default MenuItem
