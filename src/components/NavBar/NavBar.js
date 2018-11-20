import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import color from 'color'

import { Context } from './context'
import { colors } from '../../theme'

const WHITE = color('#fff')

const NavBarContainer = styled.nav`
  flex: 0 0 auto;
  height: 100vh;
  width: 64px;
  
  background-color: ${({ backgroundcolor }) => backgroundcolor};
  color: white;
  
  a {
    color: inherit;
    
    &:hover {
      color: inherit;
      text-decoration: none;
    }
  }
`

const NavBarTitle = styled.h4`
  font-family: Habx;
  padding: 32px 0;
  text-align: center;
`

const NavBarItemsContainer = styled.div`
  margin-top: 32px;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const prepareProps = props => {
  const baseColor = props.backgroundColor || colors.trueBlue

  return {
    backgroundColor: baseColor,
    activeBackgroundColor: props.activeBackgroundColor || color(baseColor).mix(WHITE, 0.2).string(),
    ...props,
  }
}

const NavBar = props => {
  const { backgroundColor, activeBackgroundColor, title, children } = prepareProps(props)

  return (
    <Context.Provider value={{ activeBackgroundColor }}>
      <NavBarContainer backgroundcolor={backgroundColor}>
        {
          title &&
          <NavBarTitle>{title}</NavBarTitle>
        }
        <NavBarItemsContainer>
          {children}
        </NavBarItemsContainer>
      </NavBarContainer>
    </Context.Provider>
  )
}

NavBar.propTypes = {
  backgroundColor: PropTypes.string,
  title: PropTypes.node,
  children: PropTypes.arrayOf(PropTypes.node).isRequired,
}

NavBar.defaultProps = {
  backgroundColor: '',
  title: null,
}

export default NavBar
