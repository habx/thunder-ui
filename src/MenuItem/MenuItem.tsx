import * as React from 'react'

import MenuItemProps from './MenuItem.interface'
import {
  MenuItemContainer,
  MenuItemContent,
  IconContainer,
} from './MenuItem.style'

const MenuItem = React.forwardRef<HTMLLIElement, MenuItemProps>(
  (props, ref) => {
    const { children, disabled, icon, ...rest } = props

    return (
      <MenuItemContainer
        data-testid="menu-item-container"
        data-disabled={disabled}
        {...rest}
        ref={ref}
      >
        {icon && <IconContainer>{icon}</IconContainer>}
        <MenuItemContent>{children}</MenuItemContent>
      </MenuItemContainer>
    )
  }
)

export default MenuItem
