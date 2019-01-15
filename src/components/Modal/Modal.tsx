import React, { Fragment, PureComponent } from 'react'
import { isFunction } from 'lodash'

import ModalProps from './Modal.interface'

import {
  Overlay,
  ModalCard,
  RemoveBodyScroll,
  ANIMATION_DURATION
} from './Modal.style'

const ESCAPE_KEY = 27

class Modal extends PureComponent<ModalProps> {
  private readonly ref: React.RefObject<any>
  private timeout: any

  static defaultProps = {
    open: false
  }

  constructor (props) {
    super(props)

    this.ref = React.createRef()
  }

  state = {
    open: this.props.open
  }

  componentDidMount () {
    window.addEventListener('keydown', this.handleKeyDown)
    window.addEventListener('click', this.handleClick, true)
  }

  componentDidUpdate (prevProps: Readonly<ModalProps>): void {
    if (prevProps.open !== this.props.open) {
      this.timeout = setTimeout(
        () => this.setState(() => ({ open: this.props.open })),
        ANIMATION_DURATION
      )
    }

    if (!prevProps.open && this.props.open && isFunction(this.props.onOpen)) {
      this.props.onOpen()
    }
  }

  componentWillUnmount () {
    window.removeEventListener('keydown', this.handleKeyDown)
    window.removeEventListener('click', this.handleClick, true)
    clearTimeout(this.timeout)
  }

  getCurrentState () {
    const { open: propsOpen } = this.props
    const { open: stateOpen } = this.state

    if (!propsOpen && !stateOpen) {
      return 'closed'
    }

    if (!propsOpen && stateOpen) {
      return 'closing'
    }

    if (propsOpen && !stateOpen) {
      return 'opening'
    }

    return 'opened'
  }

  handleKeyDown = (e) => {
    const { open } = this.props
    if (open && e.keyCode === ESCAPE_KEY) {
      this.handleClose(e)
    }
  }

  handleClick = (e) => {
    const { open } = this.props
    if (open && !this.ref.current.contains(e.target)) {
      this.handleClose(e)
    }
  }

  handleClose = (e) => {
    const { onClose } = this.props
    if (isFunction(onClose)) {
      onClose(e)
    }
  }

  render () {
    const { children, title, open, onClose, ...props } = this.props
    const currentState = this.getCurrentState()

    return (
      <Fragment>
        <Overlay data-state={currentState}>
          <div ref={this.ref}>
            <ModalCard title={title} headerPosition='inside' {...props}>
              {
                isFunction(children)
                 ? children({ state: currentState })
                 : children
              }
            </ModalCard>
          </div>
        </Overlay>
        {open && <RemoveBodyScroll />}
      </Fragment>
    )
  }
}

export default Modal
