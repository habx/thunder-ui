import * as React from 'react'
import { createPortal } from 'react-dom'

import { useIsMounted, useTimeout } from '../_internal/hooks'
import { isClientSide } from '../_internal/ssr'
import Button from '../Button'
import Modal from '../Modal'
import { ANIMATION_DURATION } from '../Modal/Modal.style'
import { subscribe, types } from '../ThunderProvider/ThunderProvider.events'

import { StateModal } from './ConfirmModals.interface'
import {
  ConfirmModalContainer,
  ConfirmModalContent,
  ConfirmModalActions,
} from './ConfirmModals.style'

const ConfirmModal: React.FunctionComponent<{}> = () => {
  const isMounted = useIsMounted()
  const registerTimeout = useTimeout()

  const [modals, setModals] = React.useState([] as StateModal[])

  const handleResponse = React.useCallback(
    (modal, response: boolean) => {
      if (isMounted.current) {
        setModals(prev =>
          prev.map(el => (el.id === modal.id ? { ...el, open: false } : el))
        )

        registerTimeout(
          setTimeout(() => {
            if (isMounted.current) {
              setModals(prev => prev.filter(el => el.id !== modal.id))
            }
          }, ANIMATION_DURATION)
        )
      }

      modal.resolve(response)
    },
    [isMounted, registerTimeout]
  )

  const handleConfirm = React.useCallback(
    modal => handleResponse(modal, true),
    [handleResponse]
  )

  const handleCancel = React.useCallback(
    modal => handleResponse(modal, false),
    [handleResponse]
  )

  React.useEffect(
    () =>
      subscribe(
        types.CONFIRM_MODAL,
        (message, options) =>
          new Promise(resolve => {
            const modal = {
              message,
              options,
              resolve,
              open: true,
              id: Math.random(),
            }

            setModals(prev => [...prev, modal])
          })
      ),
    []
  )

  return (
    <React.Fragment>
      {modals.map(modal => {
        const { options = {} } = modal
        const { cancelText = 'Annuler', confirmText = 'Valider' } = options

        const content = (
          <Modal
            open={modal.open}
            onClose={() => handleCancel(modal)}
            key={modal.id}
          >
            <ConfirmModalContainer data-testid="confirm-modal-container">
              <ConfirmModalContent data-testid="confirm-modal-content">
                {modal.message}
              </ConfirmModalContent>
              <ConfirmModalActions>
                <Button
                  data-testid="confirm-modal-cancel"
                  warning
                  onClick={() => handleCancel(modal)}
                >
                  {cancelText}
                </Button>
                <Button
                  data-testid="confirm-modal-confirm"
                  onClick={() => handleConfirm(modal)}
                >
                  {confirmText}
                </Button>
              </ConfirmModalActions>
            </ConfirmModalContainer>
          </Modal>
        )

        if (isClientSide()) {
          return createPortal(content, document.body)
        }

        return content
      })}
    </React.Fragment>
  )
}

export default ConfirmModal
