import * as React from 'react'
import { createPortal } from 'react-dom'

import { isFunction } from '../_internal/data'
import { isClientSide } from '../_internal/ssr'
import useModal, { ModalState } from '../_internal/useModal'
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

const Drawer: React.FunctionComponent<DrawerProps> = ({
  children,
  title,
  open,
  closeButton,
  portal,
  onClose,
  contentContainerComponent,
  alwaysRenderChildren,
  ...props
}) => {
  const modal = useModal<HTMLDivElement>({
    open,
    onClose,
    persistent: false,
    animated: true,
    animationDuration: ANIMATION_DURATION,
  })

  const drawerContent = (
    <Overlay
      data-state={modal.state}
      onClick={modal.overlayClick}
      data-testid="drawer-overlay"
    >
      <DrawerContainer
        data-testid="drawer-container"
        data-state={modal.state}
        ref={modal.ref}
        onClick={e => e.stopPropagation()}
        {...props}
      >
        {title && <DrawerTitle size={3}>{title}</DrawerTitle>}
        {closeButton && (
          <DrawerClose onClick={modal.close}>{closeButton}</DrawerClose>
        )}
        <DrawerContent as={contentContainerComponent}>
          {isFunction(children)
            ? children(modal as ModalState<HTMLDivElement>)
            : children}
        </DrawerContent>
      </DrawerContainer>
    </Overlay>
  )

  if (!alwaysRenderChildren && !modal.hasAlreadyBeenOpened) {
    return null
  }

  if (portal && isClientSide()) {
    return createPortal(drawerContent, document.body)
  }

  return drawerContent
}

Drawer.defaultProps = {
  position: 'right',
  portal: true,
}

export default withTriggerElement(Drawer)
