import get from 'lodash.get'
import * as React from 'react'
import { createPortal } from 'react-dom'

import { useIsMounted } from '../_internal/hooks'
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

const ConfirmModal: React.StatelessComponent<{}> = () => {
  const isMounted = useIsMounted()

  const [modals, setModals] = React.useState([] as StateModal[])

  const handleResponse = React.useCallback(
    (modal, response: boolean) => {
      if (isMounted.current) {
        setModals(prev =>
          prev.map(el => (el.id === modal.id ? { ...el, open: false } : el))
        )
        setTimeout(() => {
          if (isMounted.current) {
            setModals(prev => prev.filter(el => el.id !== modal.id))
          }
        }, ANIMATION_DURATION)
      }

      modal.resolve(response)
    },
    [isMounted]
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
          new Promise(resolve =>
            setModals(prev => [
              ...prev,
              { message, options, resolve, open: true, id: Math.random() },
            ])
          )
      ),
    []
  )

  return (
    <React.Fragment>
      {modals.map(modal => {
        const content = (
          <Modal
            open={modal.open}
            onClose={() => handleCancel(modal)}
            key={modal.id}
          >
            <ConfirmModalContainer>
              <ConfirmModalContent>{modal.message}</ConfirmModalContent>
              <ConfirmModalActions>
                <Button error onClick={() => handleCancel(modal)}>
                  {get(modal, 'options.cancelText', 'Annuler')}
                </Button>
                <Button onClick={() => handleConfirm(modal)}>
                  {get(modal, 'options.confirmText', 'Valider')}
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
