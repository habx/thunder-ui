export default interface ThunderProviderProps {
  theme?: object
}

export interface ThunderProviderInnerProps extends ThunderProviderProps {
  customTheme?: object
}

export interface ThunderProviderState {
  theme: object
  rawTheme?: object
  rawCustomTheme?: object
}
