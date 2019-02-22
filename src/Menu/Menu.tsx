import * as React from 'react'

import withIsMobile from '../_internal/withIsMobile'
import MenuProps, { MenuState } from './Menu.interface'
import { MenuWrapper, MobileMenuContainer, MenuContainer, MenuContent } from './Menu.style'

export class BaseMenu extends React.Component<MenuProps, MenuState> {
  static defaultProps = {
    position: 'left'
  }

  wrapperRef: React.RefObject<Element>

  constructor (props) {
    super(props)

    this.wrapperRef = React.createRef()
  }

  state = {
    open: false
  }

  componentDidMount () {
    window.addEventListener('click', this.handleClickOutside)
  }

  componentWillUnmount () {
    window.removeEventListener('click', this.handleClickOutside)
  }

  handleClickOutside = event => {
    if (
      this.wrapperRef &&
      !this.wrapperRef.current.contains(event.target) &&
      this.state.open
    ) {
      this.setState({ open: false })
    }
  }

  handleToggle = () => this.setState(prevState => ({ open: !prevState.open }))

  handleClose = () => this.setState(() => ({ open: false }))

  render () {
    const { triggerElement, children, position, persistent, ...props } = this.props
    const { open } = this.state

    const triggerElementWithAction = React.cloneElement(triggerElement, {
      onClick: this.handleToggle
    })

    const MenuContainerEl = this.props.isMobile
      ? MobileMenuContainer
      : MenuContainer
    const els = [
      <MenuContainerEl key='1' data-open={open} position={position}>
        <MenuContent {...props} onClick={persistent ? null : this.handleClose}>
          {children}
        </MenuContent>
      </MenuContainerEl>
    ]

    const fn = ['right', 'left'].includes(position)
      ? 'unshift'
      : 'push'

    els[fn](triggerElementWithAction)

    return (
      <MenuWrapper ref={this.wrapperRef} >
        {els}
      </MenuWrapper>
    )
  }
}

export default withIsMobile(BaseMenu)
