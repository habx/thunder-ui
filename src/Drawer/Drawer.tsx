import useModal, { Modal } from '@delangle/use-modal'
import * as React from 'react'
import { createPortal } from 'react-dom'

import { isFunction } from '../_internal/data'
import { isClientSide } from '../_internal/ssr'
import withTriggerElement from '../withTriggerElement'

import DrawerProps from './Drawer.interface'
import {
  Overlay,
  DrawerContainer,
  DrawerClose,
  DrawerTitle,
  DrawerContent,
  ANIMATION_DURATION,
} from './Drawer.style'

const Drawer = React.forwardRef<HTMLDivElement, DrawerProps>((props, ref) => {
  const {
    children,
    title,
    open,
    closeButton,
    portal,
    onClose,
    contentContainerComponent,
    alwaysRenderChildren,
    ...rest
  } = props

  const modal = useModal({
    ref,
    open,
    onClose,
    persistent: false,
    animated: true,
    animationDuration: ANIMATION_DURATION,
  })

  const drawerContent = (
    <Overlay data-state={modal.state} data-testid="drawer-overlay">
      <DrawerContainer
        data-testid="drawer-container"
        data-state={modal.state}
        onClick={e => e.stopPropagation()}
        ref={modal.ref}
        {...rest}
      >
        {title && <DrawerTitle size={3}>{title}</DrawerTitle>}
        {closeButton && (
          <DrawerClose onClick={modal.close}>{closeButton}</DrawerClose>
        )}
        <DrawerContent as={contentContainerComponent}>
          {isFunction(children) ? children(modal as Modal) : children}
        </DrawerContent>
      </DrawerContainer>
    </Overlay>
  )

  if (!alwaysRenderChildren && !modal.hasAlreadyBeenOpened) {
    return null
  }

  if (portal && isClientSide) {
    return createPortal(drawerContent, document.body)
  }

  return drawerContent
})

Drawer.defaultProps = {
  position: 'right',
  portal: true,
}

export default withTriggerElement(Drawer)
