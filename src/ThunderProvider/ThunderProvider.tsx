import * as React from 'react'
import { withTheme, ThemeProvider } from 'styled-components'

import ConfirmModals from '../confirm/ConfirmModals'
import NotificationList from '../notify/NotificationList'
import theme from '../theme'

import ThunderProviderProps, {
  ThunderProviderInnerProps,
  theme as themeType,
} from './ThunderProvider.interface'

const getCustomTheme = (customTheme: Partial<themeType>) => {
  if (customTheme === 'light') {
    return theme.light
  }

  if (customTheme === 'dark') {
    return theme.dark
  }

  return { ...theme.light, ...customTheme }
}

const BaseProvider: React.FunctionComponent<ThunderProviderInnerProps> = ({
  customTheme = {},
  theme: currentTheme,
  children,
}) => {
  const fullTheme = React.useMemo(
    () => ({ ...currentTheme, thunderUI: getCustomTheme(customTheme) }),
    [customTheme, currentTheme]
  )

  return (
    <ThemeProvider theme={fullTheme}>
      <React.Fragment>
        {children}
        <ConfirmModals />
        <NotificationList />
      </React.Fragment>
    </ThemeProvider>
  )
}

BaseProvider.defaultProps = {
  theme: {},
}

const EndhancedProvider = withTheme(BaseProvider)

const ThunderProvider: React.FunctionComponent<ThunderProviderProps> = ({
  theme: customTheme,
  ...props
}) => <EndhancedProvider customTheme={customTheme} {...props} />

export default ThunderProvider
