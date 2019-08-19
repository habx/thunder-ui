import * as React from 'react'

import { styledTheme } from '../_internal/types'
import FontIcon from '../FontIcon'
import TextButton from '../TextButton'
import theme from '../theme'
import useTheme from '../useTheme'

import NavBarContext from './NavBar.context'
import NavBarProps from './NavBar.interface'
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

const NavBar = React.forwardRef<HTMLUListElement, NavBarProps>(
  (baseProps, ref) => {
    const thunderUi = useTheme()
    const fullTheme = { thunderUi } as styledTheme

    const props = { ...baseProps, theme: fullTheme }

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

    const backgroundColor = theme.get('primary', {
      propName: 'backgroundColor',
    })(props)
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
  }
)

export default NavBar
