import * as React from 'react'

import MenuItemProps from './MenuItem.interface'
import {
  MenuItemContainer,
  MenuItemContent,
  IconContainer,
} from './MenuItem.style'

const MenuItem: React.StatelessComponent<MenuItemProps> = ({
  children,
  disabled,
  icon,
  ...props
}) => (
  <MenuItemContainer {...props} data-disabled={disabled}>
    {icon && <IconContainer>{icon}</IconContainer>}
    <MenuItemContent>{children}</MenuItemContent>
  </MenuItemContainer>
)

export default MenuItem
