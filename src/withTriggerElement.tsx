import * as React from 'react'
import { isFunction, omit } from 'lodash'

type withTriggerElementProps = {
  triggerElement: ((state: withTriggerElementState) => JSX.Element) | JSX.Element
  onClose?: (e: React.FormEvent<HTMLInputElement>) => void
}
type withTriggerElementState = { open: boolean }

const withTriggerElement = <Props extends withTriggerElementProps> (WrappedComponent: React.ComponentType<Props>) =>
  class WithTriggerElement extends React.Component<Props, withTriggerElementState> {
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
      return React.cloneElement(triggerElement as JSX.Element, {
        onClick: this.handleToggle
      })
    }

    render () {
      const { open } = this.state
      return (
        <React.Fragment>
          {this.renderTriggerElement()}
          <WrappedComponent open={open} onClose={this.handleClose} {...omit(this.props, ['triggerElement', 'onClose'])} />
        </React.Fragment>
      )
    }
  }

export default withTriggerElement
