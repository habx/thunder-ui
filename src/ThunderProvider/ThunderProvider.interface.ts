import * as React from 'react'

import ThunderUITheme from '../theme/theme.interface'

export type theme = ThunderUITheme | 'light' | 'dark'

export default interface ThunderProviderProps {
  theme?: theme
}

export interface ThunderProviderInnerProps {
  customTheme?: theme
  theme?: object
}

export type subscriptionCallback = (
  message: string | React.ComponentType<any> | React.ReactElement,
  options: object
) => Promise<any> | void
