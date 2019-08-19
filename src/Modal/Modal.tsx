import useModal, { Modal as ModalType } from '@delangle/use-modal'
import * as React from 'react'
import { createPortal } from 'react-dom'

import { isFunction } from '../_internal/data'
import { isClientSide } from '../_internal/ssr'
import withTriggerElement from '../withTriggerElement'

import ModalProps from './Modal.interface'
import {
  Overlay,
  ModalCard,
  RemoveBodyScroll,
  CloseButtonContainer,
  ANIMATION_DURATION,
} from './Modal.style'

const Modal = React.forwardRef<HTMLDivElement, ModalProps>((props, ref) => {
  const {
    children,
    title,
    open,
    closeButton,
    onClose,
    animated = true,
    portal = true,
    persistent = false,
    alwaysRenderChildren = false,
    ...rest
  } = props

  const modal = useModal({
    ref,
    open,
    onClose,
    persistent,
    animated,
    animationDuration: ANIMATION_DURATION,
  })

  const modalContent = (
    <React.Fragment>
      <Overlay
        data-state={modal.state}
        data-animated={animated}
        data-testid="modal-overlay"
      >
        <ModalCard
          data-testid="modal-container"
          data-animated={animated}
          title={title}
          headerPosition="inside"
          {...rest}
          ref={modal.ref}
          onClick={e => e.stopPropagation()}
        >
          {closeButton && (
            <CloseButtonContainer hasTitle={!!title} onClick={modal.close}>
              {closeButton}
            </CloseButtonContainer>
          )}

          {isFunction(children) ? children(modal as ModalType) : children}
        </ModalCard>
      </Overlay>
      {open && <RemoveBodyScroll />}
    </React.Fragment>
  )

  if (!alwaysRenderChildren && !modal.hasAlreadyBeenOpened) {
    return null
  }

  if (portal && isClientSide) {
    return createPortal(modalContent, document.body)
  }

  return modalContent
})

export default withTriggerElement<HTMLDivElement>()(Modal)
