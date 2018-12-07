import * as React from 'react'

import MenuProps from './Menu.interface'
import { MenuWrapper, MenuContainer, MenuContent } from './Menu.style'

class Menu extends React.Component<MenuProps> {
  static defaultProps = {
    position: 'left',
  }

  wrapperRef: React.RefObject<Element>

  constructor(props) {
    super(props)

    this.wrapperRef = React.createRef()
  }

  state = {
    open: false,
  }

  componentDidMount() {
    window.addEventListener('click', this.handleClickOutside)
  }

  componentWillUnmount() {
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

  handleClick = () => this.setState({ open: !this.state.open })

  render() {
    const { triggerElement, children, position, ...props } = this.props
    const triggerElementWithAction =
      React.cloneElement(triggerElement, { onClick: this.handleClick })
    const { open } = this.state
    return (
      <MenuWrapper ref={this.wrapperRef} >
        {triggerElementWithAction}
        <MenuContainer data-open={open} position={position}>
          <MenuContent {...props} onClick={() => this.setState({ open: false })}>
            {children}
          </MenuContent>
        </MenuContainer>
      </MenuWrapper>
    )
  }
}

export default Menu
