import { DOMNode } from '../_internal/types'

export default interface TextButtonProps extends DOMNode {
  color?: string
  hoverColor?: string
  warning?: boolean
  info?: boolean
  error?: boolean
  disabled?: boolean
}
