import { DOMNode } from '../_internal/types'

export default interface IconButtonProps extends DOMNode {
  color?: string
  disabled?: boolean
  small?: boolean
  large?: boolean
  error?: boolean
  warning?: boolean
  info?: boolean
}
