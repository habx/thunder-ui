import React from 'react'
import PropTypes from 'prop-types'

import { MenuContainer, MenuContent } from './style'

const Menu = ({ open, children, position, ...props }) => (
  <MenuContainer data-open={open} position={position}>
    <MenuContent {...props}>
      { children }
    </MenuContent>
  </MenuContainer>
)

Menu.propTypes = {
  open: PropTypes.bool,
  children: PropTypes.node,
  position: PropTypes.oneOf(['left', 'right']),
}

Menu.defaultProps = {
  open: false,
  children: null,
  position: 'left',
}

export default Menu
