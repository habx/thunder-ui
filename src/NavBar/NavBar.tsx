import * as React from 'react'
import { withTheme } from 'styled-components'
import color from 'color'

import FontIcon from '../FontIcon'
import TextButton from '../TextButton'
import { getMainColor } from '../_internal/colors'
import { Context } from './context'

import {
  NavBarContainer,
  NavBarSideContainer,
  NavBarItemsContainer,
  NavBarTitle,
  NavBarPaddingTop,
  NavBarTopBar,
  NavBarTopBarTitle,
  NavBarClose,
  NavBarTopBarSquare
} from './NavBar.style'
import NavBarProps, { NavBarState } from './NavBar.interface'

const WHITE = color('#fff')

const prepareProps = props => {
  const baseColor = getMainColor(props, { propName: 'backgroundColor' })

  return {
    backgroundColor: baseColor,
    activeBackgroundColor: props.activeBackgroundColor || color(baseColor).mix(WHITE, 0.2).string(),
    ...props
  }
}

class NavBar extends React.PureComponent<NavBarProps, NavBarState> {
  state = {
    mobileIsOpen: this.props.defaultMobileIsOpen
  }

  toggleMenu = () => this.setState({ mobileIsOpen: !this.state.mobileIsOpen })

  render () {
    const { backgroundColor, activeBackgroundColor, title, children } = prepareProps(this.props)

    return (
      <Context.Provider value={{ activeBackgroundColor }}>
        <NavBarContainer>
          <NavBarPaddingTop />

          <NavBarTopBar>
            <NavBarTopBarSquare>
              <TextButton onClick={this.toggleMenu}>
                <FontIcon icon='menu' />
              </TextButton>
            </NavBarTopBarSquare>

            {title &&
              <NavBarTopBarTitle>{title}</NavBarTopBarTitle>
            }

            <NavBarTopBarSquare>
            </NavBarTopBarSquare>
          </NavBarTopBar>

          <NavBarSideContainer
            backgroundcolor={backgroundColor}
            mobileIsOpen={this.state.mobileIsOpen}
          >
            <NavBarClose>
              <FontIcon icon='arrow_back' onClick={this.toggleMenu} />
            </NavBarClose>
            {
              title &&
              <NavBarTitle>{title}</NavBarTitle>
            }
            <NavBarItemsContainer>
              {children}
            </NavBarItemsContainer>
          </NavBarSideContainer>
        </NavBarContainer>
      </Context.Provider>
    )
  }
}

export default withTheme(NavBar)
