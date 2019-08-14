import * as React from 'react'
import { createPortal } from 'react-dom'

import { isFunction } from '../_internal/data'
import { isClientSide } from '../_internal/ssr'
import useModal, { ModalState } from '../_internal/useModal'
import withTriggerElement from '../withTriggerElement'

import ModalProps from './Modal.interface'
import {
  Overlay,
  ModalCard,
  RemoveBodyScroll,
  CloseButtonContainer,
  ANIMATION_DURATION,
} from './Modal.style'

const Modal: React.FunctionComponent<ModalProps> = ({
  children,
  title,
  open,
  closeButton,
  animated,
  portal,
  persistent,
  onClose,
  alwaysRenderChildren,
  ...props
}) => {
  const modal = useModal<HTMLDivElement>({
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
        onClick={modal.overlayClick}
        data-testid="modal-overlay"
      >
        <ModalCard
          data-testid="modal-container"
          data-animated={animated}
          title={title}
          headerPosition="inside"
          {...props}
          ref={modal.ref}
          onClick={e => e.stopPropagation()}
        >
          {closeButton && (
            <CloseButtonContainer hasTitle={!!title} onClick={modal.close}>
              {closeButton}
            </CloseButtonContainer>
          )}

          {isFunction(children)
            ? children(modal as ModalState<HTMLDivElement>)
            : children}
        </ModalCard>
      </Overlay>
      {open && <RemoveBodyScroll />}
    </React.Fragment>
  )

  if (!alwaysRenderChildren && !modal.hasAlreadyBeenOpened) {
    return null
  }

  if (portal && isClientSide()) {
    return createPortal(modalContent, document.body)
  }

  return modalContent
}

Modal.defaultProps = {
  persistent: false,
  animated: true,
  portal: true,
}

export default withTriggerElement(Modal)
