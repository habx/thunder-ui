import DOMInterface from '../_internal/domInterface'

export default interface TextButtonProps extends DOMInterface {
  color?: string
  hoverColor?: string
  warning?: boolean
  info?: boolean
  error?: boolean
  disabled?: boolean
}
