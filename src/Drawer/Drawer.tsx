import React, { PureComponent } from 'react'
import { isFunction } from 'lodash'

import DrawerProps from './Drawer.interface'

import {
  Overlay,
  DrawerContainer,
  DrawerClose,
  DrawerTitle,
  DrawerContent,
  ANIMATION_DURATION
} from './Drawer.style'

const ESCAPE_KEY = 27

class Drawer extends PureComponent<DrawerProps> {
  private readonly ref: React.RefObject<any>
  private timeout: any

  static defaultProps = {
    open: false,
    position: 'right'
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

  componentDidUpdate (prevProps: Readonly<DrawerProps>): void {
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
    this.timeout = setTimeout(
      () => this.setState(() => ({ open: this.props.open })),
      ANIMATION_DURATION
    )
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
    const { children, title, closeButton, ...props } = this.props
    const currentState = this.getCurrentState()

    return (
      <Overlay data-state={currentState}>
        <div ref={this.ref}>
          <DrawerContainer data-state={currentState} {...props}>
            {title && <DrawerTitle size={3}>{title}</DrawerTitle>}
            {closeButton && <DrawerClose onClick={this.handleClose}>{closeButton}</DrawerClose>}
            <DrawerContent>
              {
                isFunction(children)
                  ? children({ state: currentState })
                  : children
              }
            </DrawerContent>
          </DrawerContainer>
        </div>
      </Overlay>
    )
  }
}

export default Drawer
