import React, { Fragment, PureComponent } from 'react'
import { isFunction } from 'lodash'

import ModalProps from './Modal.interface'

import {
  Overlay,
  ModalCard,
  RemoveBodyScroll,
  CloseButtonContainer,
  ANIMATION_DURATION
} from './Modal.style'

const ESCAPE_KEY = 27

class Modal extends PureComponent<ModalProps> {
  private readonly ref: React.RefObject<any>
  private timeout: any

  static defaultProps = {
    open: false,
    persistent: false,
    animated: true
  }

  static getDerivedStateFromProps (nextProps, prevState) {
    const { animated } = nextProps

    if (!animated) {
      return {
        open: nextProps.open
      }
    }
  }

  constructor (props) {
    super(props)

    this.ref = React.createRef()
  }

  state = {
    open: false
  }

  componentDidMount () {
    window.addEventListener('keydown', this.handleKeyDown)
    window.addEventListener('click', this.handleClick)

    if (this.props.open) {
      this.animateOpening()
    }
  }

  componentDidUpdate (prevProps: Readonly<ModalProps>): void {
    if (prevProps.open !== this.props.open) {
      this.animateOpening()
    }
  }

  componentWillUnmount () {
    window.removeEventListener('keydown', this.handleKeyDown)
    window.removeEventListener('click', this.handleClick, true)
    clearTimeout(this.timeout)
  }

  animateOpening () {
    const { animated } = this.props

    if (animated) {
      this.timeout = setTimeout(
        () => this.setState(() => ({ open: this.props.open })),
        ANIMATION_DURATION
      )
    }
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
    const { open, persistent } = this.props
    if (!persistent && open && e.keyCode === ESCAPE_KEY) {
      this.handleClose(e)
    }
  }

  handleClick = (e) => {
    const { open, persistent } = this.props
    if (!persistent && open && !this.ref.current.contains(e.target)) {
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
    const { children, title, open, closeButton, animated, ...props } = this.props
    const currentState = this.getCurrentState()

    return (
      <Fragment>
        <Overlay data-state={currentState}>
          <div ref={this.ref}>
            <ModalCard title={title} headerPosition='inside' {...props} data-animated={animated}>
              {closeButton && <CloseButtonContainer hasTitle={title} onClick={this.handleClose}>{closeButton}</CloseButtonContainer>}
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
