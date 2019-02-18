type ThunderUITheme = {
  error?: string
  warning?: string

  primaryLighter?: string
  primaryLight?: string
  primary?: string

  neutralLighter?: string
  neutralLight?: string
  neutral?: string
  neutralDark?: string
}

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
