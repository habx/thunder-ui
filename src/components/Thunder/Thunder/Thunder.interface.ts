import DOMInterface from '../../../internal/domInterface'

type themeType = {
  background?: string,
  border?: string,
  text?: string,

  modal?: {
    overlayOpacity?: number,
  },

  section?: {
    title?: string,
  },

  item?: {
    title?: string,
    subtitle?: string,
    focus?: string,
    actionIcon?: string,
    icon?: string,
    iconBackground?: string,
    highlight?: string,
    subtitleFont?: string,
  },

  welcome?: {
    background?: string,
    color?: string,
  },
}

export default interface ThunderProps extends DOMInterface {
  query?: string
  data?: Array<any> | object
  open?: boolean,
  onOpen?: () => void
  onQueryChange?: (string) => void
  placeholder?: string
  theme?: themeType
}

export interface ThunderInnerProps extends ThunderProps {
  customTheme?: themeType
  theme: themeType
}
