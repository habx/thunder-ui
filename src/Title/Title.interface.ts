import { DOMNode, color } from '../_internal/types'

export default interface TitleProps extends DOMNode {
  size?: number
  color?: color
  underline?: boolean
  error?: boolean
  warning?: boolean
}
