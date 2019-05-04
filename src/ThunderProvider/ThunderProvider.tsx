import * as React from 'react'
import { withTheme, ThemeProvider } from 'styled-components'
import merge from 'lodash.merge'

import ConfirmModals from '../confirm/ConfirmModals'
import NotificationList from '../notify/NotificationList'

import ThunderProviderProps, { ThunderProviderInnerProps } from './ThunderProvider.interface'

import theme from '../theme'

const getCustomTheme = customTheme => {
  if (customTheme === 'light') {
    return theme.light
  }

  if (customTheme === 'dark') {
    return theme.dark
  }

  return merge({}, theme.light, customTheme)
}

const BaseProvider: React.StatelessComponent<ThunderProviderInnerProps> = props => {
  const fullTheme = React.useMemo(() => merge(
    {},
    props.theme,
    { thunderUI: getCustomTheme(props.customTheme)
    }
  ), [])

  return (
    <ThemeProvider theme={fullTheme}>
      <React.Fragment>
        { props.children }
        <ConfirmModals />
        <NotificationList />
      </React.Fragment>
    </ThemeProvider>
  )
}

const EndhancedProvider = withTheme(BaseProvider)

const ThunderProvider: React.StatelessComponent<ThunderProviderProps> = ({ theme, ...props }) => (
  <EndhancedProvider customTheme={theme} {...props} />
)

export default ThunderProvider
