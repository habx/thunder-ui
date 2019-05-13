import ThunderUITheme from '../theme/theme.interface'

type theme = ThunderUITheme | 'light' | 'dark'

export default interface ThunderProviderProps {
  theme?: theme
}

export interface ThunderProviderInnerProps {
  customTheme?: theme
  theme?: object
}
