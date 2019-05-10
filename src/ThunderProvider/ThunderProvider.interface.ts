import { ThunderUITheme } from '../useTheme'

type theme = ThunderUITheme | 'light' | 'dark'

export default interface ThunderProviderProps {
  theme?: theme
}

export interface ThunderProviderInnerProps extends ThunderProviderProps {
  customTheme?: theme
  theme?: object
}
