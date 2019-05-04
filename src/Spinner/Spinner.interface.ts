import { color, DOMNode, styledTheme } from '../_internal/types'

export default interface SpinnerProps extends DOMNode {
  size?: number
  color?: color
}

export interface SpinnerInnerProps extends SpinnerProps {
  theme: styledTheme
}
