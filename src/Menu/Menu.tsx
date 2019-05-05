import * as React from 'react'
import { createPortal } from 'react-dom'

import { useIsSmallScreen, useOnWindowResize } from '../_internal/hooks'
import { isClientSide, ssrDOMRect } from '../_internal/ssr'

import MenuProps from './Menu.interface'
import {
  MenuWrapper,
  MobileMenuContainer,
  MenuContainerDesktop,
  MenuContent,
  Overlay,
} from './Menu.style'

const Menu: React.StatelessComponent<MenuProps> = ({
  triggerElement,
  children,
  position,
  persistent,
  portal,
  ...props
}) => {
  const wrapperRef = React.useRef(null)
  const [wrapperRect, setWrapperRect] = React.useState(
    typeof DOMRect === 'function' ? new DOMRect() : ssrDOMRect
  )
  const [open, setOpen] = React.useState(false)

  const handleWrapperChange = () => {
    if (open) {
      setWrapperRect(wrapperRef.current.getBoundingClientRect())
    }
  }
  React.useEffect(handleWrapperChange, [wrapperRef, open])
  useOnWindowResize(handleWrapperChange)

  const isSmallScreen = useIsSmallScreen()

  const handleClose = React.useCallback(() => setOpen(false), [setOpen])

  const handleToggle = React.useCallback(
    e => {
      if (e) {
        e.preventDefault()
        e.stopPropagation()
      }
      setOpen(wasOpen => !wasOpen)
    },
    [setOpen]
  )

  const triggerElementWithAction = React.cloneElement(triggerElement, {
    onClick: handleToggle,
  })

  const MenuContainer = isSmallScreen
    ? MobileMenuContainer
    : MenuContainerDesktop
  const isTriggerElementBeforeMenu = ['right', 'left'].includes(position)

  const menu = (
    <MenuContainer
      data-testid="menu-container"
      data-open={open}
      position={position}
      wrapperRect={wrapperRect}
    >
      <MenuContent {...props} onClick={persistent ? null : handleClose}>
        {children}
      </MenuContent>
    </MenuContainer>
  )
  return (
    <React.Fragment>
      {open &&
        isClientSide() &&
        createPortal(<Overlay onClick={handleToggle} />, document.body)}
      <MenuWrapper ref={wrapperRef}>
        {isTriggerElementBeforeMenu && triggerElementWithAction}
        {portal && isClientSide() ? createPortal(menu, document.body) : menu}
        {!isTriggerElementBeforeMenu && triggerElementWithAction}
      </MenuWrapper>
    </React.Fragment>
  )
}

Menu.defaultProps = {
  position: 'left',
  portal: true,
}

export default Menu
