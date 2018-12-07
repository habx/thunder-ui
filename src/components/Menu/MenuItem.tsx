import * as React from 'react'

import { MenuItemContainer, MenuItemContent, IconContainer } from './MenuItem.style'
import MenuItemProps from './MenuItem.interface'

const MenuItem: React.StatelessComponent<MenuItemProps> = ({ children, icon, ...props }) => (
  <MenuItemContainer {...props}>
    { icon && <IconContainer>{ icon }</IconContainer>}
    <MenuItemContent>
      { children }
    </MenuItemContent>
  </MenuItemContainer>
)

export default MenuItem
