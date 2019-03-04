import * as React from 'react'
import useOnClickOutside from 'use-onclickoutside'

import MenuProps from './Menu.interface'
import { MenuWrapper, MobileMenuContainer, MenuContainerDesktop, MenuContent } from './Menu.style'

import { useIsSmallScreen } from '../_internal/hooks'

const Menu: React.StatelessComponent<MenuProps> = ({
  triggerElement,
  children,
  position,
  persistent,
  ...props
}) => {
  const wrapperRef = React.useRef(null)
  const [open, setOpen] = React.useState(false)
  const isSmallScreen = useIsSmallScreen()

  const handleClose = React.useCallback(
    () => setOpen(false),
    [setOpen]
  )

  const handleToggle = React.useCallback(
    () => setOpen(wasOpen => !wasOpen),
    [setOpen]
  )

  useOnClickOutside(wrapperRef, handleClose)

  const triggerElementWithAction = React.cloneElement(triggerElement, {
    onClick: handleToggle
  })

  const MenuContainer = isSmallScreen ? MobileMenuContainer : MenuContainerDesktop
  const isTriggerElementBeforeMenu = ['right', 'left'].includes(position)

  return (
    <MenuWrapper ref={wrapperRef} >
      { isTriggerElementBeforeMenu && triggerElementWithAction }
      <MenuContainer data-open={open} position={position}>
        <MenuContent {...props} onClick={persistent ? null : handleClose}>
          {children}
        </MenuContent>
      </MenuContainer>
      { !isTriggerElementBeforeMenu && triggerElementWithAction }
    </MenuWrapper>
  )
}

Menu.defaultProps = {
  position: 'left'
}

export default Menu
