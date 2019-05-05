import * as React from 'react'
import { withTheme } from 'styled-components'

import FontIcon from '../FontIcon'
import TextButton from '../TextButton'
import theme from '../theme'

import { Context } from './context'
import NavBarProps, { NavBarInnerProps } from './NavBar.interface'
import {
  NavBarContainer,
  NavBarSideContainer,
  NavBarItemsContainer,
  NavBarTitle,
  NavBarPaddingTop,
  NavBarTopBar,
  NavBarTopBarTitle,
  NavBarClose,
  NavBarTopBarSquare,
} from './NavBar.style'

const NavBar: React.ComponentType<
  NavBarInnerProps & React.ClassAttributes<any>
> = React.forwardRef((props, ref) => {
  const {
    children,
    title,
    backgroundColor: rawBackgroundColor,
    ...rest
  } = props

  const [isOpenedOnMobile, setOpenedOnMobile] = React.useState(false)

  const handleMobileToggle = React.useCallback(
    () => setOpenedOnMobile(prev => !prev),
    []
  )

  const backgroundColor = theme.get('primary', { propName: 'backgroundColor' })(
    props
  )
  const activeBackgroundColor = theme.getActive(
    props.activeBackgroundColor,
    backgroundColor
  )

  return (
    <Context.Provider value={{ activeBackgroundColor }}>
      <NavBarContainer data-testid="nav-bar-container" {...rest} ref={ref}>
        <NavBarPaddingTop />

        <NavBarTopBar>
          <NavBarTopBarSquare>
            <TextButton onClick={handleMobileToggle}>
              <FontIcon icon="menu" />
            </TextButton>
          </NavBarTopBarSquare>

          {title && <NavBarTopBarTitle>{title}</NavBarTopBarTitle>}

          <NavBarTopBarSquare />
        </NavBarTopBar>

        <NavBarSideContainer
          backgroundcolor={backgroundColor}
          data-mobile-open={isOpenedOnMobile}
        >
          <NavBarClose>
            <FontIcon icon="arrow_back" onClick={this.toggleMenu} />
          </NavBarClose>
          {title && <NavBarTitle>{title}</NavBarTitle>}
          <NavBarItemsContainer>{children}</NavBarItemsContainer>
        </NavBarSideContainer>
      </NavBarContainer>
    </Context.Provider>
  )
})

export default withTheme(NavBar) as React.StatelessComponent<NavBarProps>
