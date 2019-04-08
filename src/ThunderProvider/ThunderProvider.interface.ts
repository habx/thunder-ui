import { ThunderUITheme } from '../useTheme'

export default interface ThunderProviderProps {
  theme?: ThunderUITheme
}

export interface ThunderProviderInnerProps extends ThunderProviderProps {
  customTheme?: ThunderUITheme
  theme?: object
}

export interface ThunderProviderState {
  theme: object
  rawTheme?: object
  rawCustomTheme?: object
}
