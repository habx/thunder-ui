import * as React from 'react'
import Modal from './Modal'
import Drawer from './Drawer'
import { isFunction } from 'lodash'
import { DrawerSpecificProps } from './Drawer/Drawer.interface'
import { ModalSpecificProps } from './Modal/Modal.interface'

type withTriggerElementWrappedComponentAllowed = typeof Modal | typeof Drawer
type withTriggerElementProps = {
  triggerElement: ((state: withTriggerElementState) => JSX.Element) | JSX.Element
  onClose?: (e: React.FormEvent<HTMLInputElement>) => void
} & (DrawerSpecificProps | ModalSpecificProps)
type withTriggerElementState = { open: boolean }

const withTriggerElement = (WrappedComponent: withTriggerElementWrappedComponentAllowed) => {
  return class WithTriggerElement extends React.Component<withTriggerElementProps, withTriggerElementState> {
    state = { open: false }

    handleToggle = () => this.setState({ open: !this.state.open })
    handleClose = e => {
      const { onClose } = this.props
      if (isFunction(onClose)) {
        onClose(e)
      }
      this.setState({ open: false })
    }

    renderTriggerElement = () => {
      const { triggerElement } = this.props
      if (isFunction(triggerElement)) {
        return triggerElement(this.state)
      }
      return React.cloneElement(triggerElement, {
        onClick: this.handleToggle
      })
    }

    render () {
      const { triggerElement, ...props } = this.props
      const { open } = this.state
      return (
        <React.Fragment>
          {this.renderTriggerElement()}
          <WrappedComponent open={open} onClose={this.handleClose} {...props} />
        </React.Fragment>
      )
    }
  }
}

export default withTriggerElement
