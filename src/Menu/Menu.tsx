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
  const isMobile = useIsSmallScreen()

  const handleClose = React.useMemo(
    () => () => setOpen(false),
    []
  )

  const handleToggle = React.useMemo(
    () => () => setOpen(wasOpen => !wasOpen),
    []
  )

  useOnClickOutside(wrapperRef, handleClose)

  const triggerElementWithAction = React.cloneElement(triggerElement, {
    onClick: handleToggle
  })

  const MenuContainer = isMobile ? MobileMenuContainer : MenuContainerDesktop
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
