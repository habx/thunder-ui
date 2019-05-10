import * as React from 'react'

import MenuItemProps from './MenuItem.interface'
import {
  MenuItemContainer,
  MenuItemContent,
  IconContainer,
} from './MenuItem.style'

const MenuItem: React.FunctionComponent<MenuItemProps> = ({
  children,
  disabled,
  icon,
  ...props
}) => (
  <MenuItemContainer
    data-testid="menu-item-container"
    data-disabled={disabled}
    {...props}
  >
    {icon && <IconContainer>{icon}</IconContainer>}
    <MenuItemContent>{children}</MenuItemContent>
  </MenuItemContainer>
)

export default MenuItem
