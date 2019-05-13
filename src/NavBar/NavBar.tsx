import * as React from 'react'
import { withTheme } from 'styled-components'

import { styledTheme } from '../_internal/types'
import FontIcon from '../FontIcon'
import TextButton from '../TextButton'
import theme from '../theme'

import NavBarContext from './NavBar.context'
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

  const context = React.useMemo(
    () => ({ activeBackgroundColor, isInsideANavBar: true }),
    [activeBackgroundColor]
  )

  return (
    <NavBarContext.Provider value={context}>
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
            <FontIcon icon="arrow_back" onClick={handleMobileToggle} />
          </NavBarClose>
          {title && <NavBarTitle>{title}</NavBarTitle>}
          <NavBarItemsContainer>{children}</NavBarItemsContainer>
        </NavBarSideContainer>
      </NavBarContainer>
    </NavBarContext.Provider>
  )
})

NavBar.defaultProps = {
  theme: {} as styledTheme,
}

export default withTheme(NavBar) as React.FunctionComponent<NavBarProps>
