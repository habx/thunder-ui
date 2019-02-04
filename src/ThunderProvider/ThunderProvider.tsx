import * as React from 'react'
import { withTheme, ThemeProvider } from 'styled-components'
import { merge } from 'lodash'

import ConfirmModals from '../confirm/ConfirmModals'
import NotificationList from '../notify/NotificationList'

import ThunderProviderProps, { ThunderProviderInnerProps, ThunderProviderState } from './ThunderProvider.interface'
import BASE_THEME from './ThunderProvider.theme'

class BaseProvider extends React.Component<ThunderProviderInnerProps, ThunderProviderState> {
  static getDerivedStateFromProps (nextProps: ThunderProviderInnerProps, prevState: ThunderProviderState) {
    if (nextProps.theme !== prevState.rawTheme || nextProps.customTheme !== prevState.rawCustomTheme) {
      return {
        theme: merge(
          {},
          nextProps.theme,
          { thunderUI: BASE_THEME},
          { thunderUI: nextProps.customTheme }
          )
      }
    }

    return null
  }

  state = {
    rawTheme: null,
    rawCustomTheme: null,
    theme: null
  }

  render () {
    const { theme } = this.state

    return (
      <ThemeProvider theme={theme}>
        <React.Fragment>
          { this.props.children }
          <ConfirmModals />
          <NotificationList />
        </React.Fragment>
      </ThemeProvider>
    )
  }
}

const EndhancedProvider = withTheme(BaseProvider)

const ThunderProvider: React.StatelessComponent<ThunderProviderProps> = ({ theme, ...props }) => (
  <EndhancedProvider customTheme={theme} {...props} />
)

export default ThunderProvider
