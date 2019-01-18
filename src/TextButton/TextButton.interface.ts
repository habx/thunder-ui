import DOMInterface from '../internal/domInterface'

export default interface TextButtonProps extends DOMInterface {
  color?: string
  hoverColor?: string
  warning?: boolean
  info?: boolean
  disabled?: boolean
}
