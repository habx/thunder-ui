import * as React from 'react'
import color from 'color'

import colors from '../colors'

import { Context } from './context'

import { NavBarContainer, NavBarItemsContainer, NavBarTitle } from './NavBar.style'
import NavBarProps from './NavBar.interface'

const WHITE = color('#fff')

const prepareProps = props => {
  const baseColor = props.backgroundColor || colors.trueBlue

  return {
    backgroundColor: baseColor,
    activeBackgroundColor: props.activeBackgroundColor || color(baseColor).mix(WHITE, 0.2).string(),
    ...props
  }
}

const NavBar: React.StatelessComponent<NavBarProps> = props => {
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

export default NavBar
