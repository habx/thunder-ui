import * as React from 'react'

import MenuProps, { MenuState } from './Menu.interface'
import { MenuWrapper, MenuContainer, MenuContent } from './Menu.style'

class Menu extends React.Component<MenuProps, MenuState> {
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
    const { triggerElement, children, position, ...props } = this.props
    const { open } = this.state

    const triggerElementWithAction = React.cloneElement(triggerElement, {
      onClick: this.handleToggle
    })

    return (
      <MenuWrapper ref={this.wrapperRef} >
        {triggerElementWithAction}
        <MenuContainer data-open={open} position={position}>
          <MenuContent {...props} onClick={this.handleClose}>
            {children}
          </MenuContent>
        </MenuContainer>
      </MenuWrapper>
    )
  }
}

export default Menu
