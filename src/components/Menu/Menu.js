import React, { Component } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

import { MenuContainer, MenuContent } from './style'

const MenuWrapper = styled.div`
  position: relative;
`

class Menu extends Component {
  constructor(props) {
    super(props)
    this.wrapperRef = React.createRef()
  }
  state = { open: false }

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

  handleClick = () => this.setState({ open: true })

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

Menu.propTypes = {
  open: PropTypes.bool,
  children: PropTypes.node,
  position: PropTypes.oneOf(['left', 'right']),
  onClick: PropTypes.func,
}

Menu.defaultProps = {
  open: false,
  children: null,
  position: 'left',
  onClick: () => {},
}

export default Menu
