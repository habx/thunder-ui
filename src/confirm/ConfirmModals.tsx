import * as React from 'react'
import { map, get, memoize, filter } from 'lodash'

import { subscribe, types } from '../HabxProvider/HabxProvider.events'
import Button from '../Button'
import Modal from '../Modal'
import { ANIMATION_DURATION } from '../Modal/Modal.style'

import COnfirmModalProps, { ConfirmModalsState } from './ConfirmModals.interface'
import { ConfirmModalContainer, ConfirmModalContent, ConfirmModalActions } from './ConfirmModals.style'

class ConfirmModal extends React.PureComponent<COnfirmModalProps, ConfirmModalsState> {
  state = {
    modals: []
  }

  componentDidMount () {
    subscribe(types.CONFIRM_MODAL, (message, options) => (
      new Promise(resolve => this.setState(prevState => ({
        modals: [...prevState.modals, { message, options, resolve, open: true }]
      })))
    ))
  }

  handleConfirm = memoize(modal => () => this.handleResponse(modal, true))

  handleCancel = memoize(modal => () => this.handleResponse(modal, false))

  handleResponse = (modal, response: boolean) => {
    this.setState(prevState => ({
      modals: map(prevState.modals, el => (el === modal ? { ...el, open: false } : el))
    }), () => this.handleModalClose(modal))

    modal.resolve(response)
  }

  handleModalClose (modal) {
    setTimeout(() => {
      this.setState(prevState => ({
        modals: filter(prevState.modals, el => el !== modal)
      }))
    }, ANIMATION_DURATION)
  }

  render () {
    const { modals } = this.state
    return map(modals, (modal, index) => (
      <Modal open={modal.open} onClose={() => null} key={index} persistent>
        <ConfirmModalContainer>
          <ConfirmModalContent>
            {modal.message}
          </ConfirmModalContent>
          <ConfirmModalActions>
            <Button warning onClick={this.handleCancel(modal)}>
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
