import * as React from 'react'
import { createPortal } from 'react-dom'

import { isFunction } from '../_internal/data'
import { useIsSmallScreen } from '../_internal/hooks'
import { isClientSide, ssrClientRect } from '../_internal/ssr'
import { RemoveBodyScroll } from '../Modal/Modal.style'

import MenuProps from './Menu.interface'
import {
  MenuWrapper,
  MobileMenuContainer,
  MenuContainerDesktop,
  MenuContent,
  Overlay,
} from './Menu.style'

const Menu = React.forwardRef<HTMLDivElement, MenuProps>((props, ref) => {
  const {
    triggerElement,
    children,
    position = 'left',
    persistent,
    portal = true,
    alwaysRenderChildren,
    ...rest
  } = props

  const wrapperRef = React.useRef<HTMLDivElement>(null)
  const [wrapperRect, setWrapperRect] = React.useState<ClientRect>(
    typeof DOMRect === 'function' ? new DOMRect() : ssrClientRect
  )
  const [open, setOpen] = React.useState(false)

  const updateWrapperReact = React.useCallback(
    () =>
      wrapperRef.current &&
      setWrapperRect(wrapperRef.current.getBoundingClientRect()),
    []
  )

  React.useEffect(() => {
    const handleWrapperChange = () => {
      if (open) {
        updateWrapperReact()
      }
    }

    handleWrapperChange()

    document.addEventListener('resize', handleWrapperChange)

    return () => {
      document.removeEventListener('resize', handleWrapperChange)
    }
  }, [open, updateWrapperReact])

  const isSmallScreen = useIsSmallScreen()

  const handleClose = React.useCallback(() => setOpen(false), [setOpen])

  const handleToggle = React.useCallback(
    e => {
      if (e) {
        e.preventDefault()
        e.stopPropagation()
      }
      updateWrapperReact()
      setOpen(wasOpen => !wasOpen)
    },
    [updateWrapperReact]
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
      ref={ref}
    >
      <MenuContent {...rest} onClick={persistent ? undefined : handleClose}>
        {isFunction(children)
          ? children({
              state: open ? 'open' : 'close',
              close: () => setOpen(false),
            })
          : children}
      </MenuContent>
    </MenuContainer>
  )

  return (
    <React.Fragment>
      {open && (
        <React.Fragment>
          {isClientSide &&
            createPortal(<Overlay onClick={handleToggle} />, document.body)}
          <RemoveBodyScroll />
        </React.Fragment>
      )}
      <MenuWrapper ref={wrapperRef}>
        {isTriggerElementBeforeMenu && triggerElementWithAction}
        {portal && isClientSide ? createPortal(menu, document.body) : menu}
        {!isTriggerElementBeforeMenu && triggerElementWithAction}
      </MenuWrapper>
    </React.Fragment>
  )
})

export default Menu
