import * as React from 'react'
import memoize from 'lodash/memoize'
import get from 'lodash/get'

import { subscribe, types } from '../ThunderProvider/ThunderProvider.events'

import Button from '../Button'
import Modal from '../Modal'
import { ANIMATION_DURATION } from '../Modal/Modal.style'

import ConfirmModalProps, { ConfirmModalsState } from './ConfirmModals.interface'
import { ConfirmModalContainer, ConfirmModalContent, ConfirmModalActions } from './ConfirmModals.style'

class ConfirmModal extends React.PureComponent<ConfirmModalProps, ConfirmModalsState> {
  state = {
    modals: []
  }

  componentDidMount () {
    subscribe(types.CONFIRM_MODAL, (message, options) => (
      new Promise(resolve => this.setState(prevState => ({
        modals: [
          ...prevState.modals,
          { message, options, resolve, open: true, id: Math.random() }
        ]
      })))
    ))
  }

  handleConfirm = memoize(modal => () => this.handleResponse(modal, true))

  handleCancel = memoize(modal => () => this.handleResponse(modal, false))

  handleResponse = (modal, response: boolean) => {
    this.setState(prevState => ({
      modals: prevState.modals.map(el => (el.id === modal.id ? { ...el, open: false } : el))
    }), () => this.handleModalClose(modal.id))

    modal.resolve(response)
  }

  handleModalClose (id) {
    setTimeout(() => {
      this.setState(prevState => ({
        modals: prevState.modals.filter(el => el.id !== id)
      }))
    }, ANIMATION_DURATION)
  }

  render () {
    const { modals } = this.state
    return modals.map(modal => (
      <Modal open={modal.open} onClose={this.handleCancel(modal)} key={modal.id}>
        <ConfirmModalContainer>
          <ConfirmModalContent>
            {modal.message}
          </ConfirmModalContent>
          <ConfirmModalActions>
            <Button error onClick={this.handleCancel(modal)}>
              { get(modal, 'options.cancelText', 'Annuler')}
            </Button>
            <Button onClick={this.handleConfirm(modal)}>
              { get(modal, 'options.confirmText', 'Valider')}
            </Button>
          </ConfirmModalActions>
        </ConfirmModalContainer>
      </Modal>
    ))

  }
}

export default ConfirmModal
