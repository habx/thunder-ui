import DOMInterface from '../_internal/domInterface'

export default interface IconButtonProps extends DOMInterface {
  color?: string
  disabled?: boolean
  small?: boolean
  large?: boolean
  error?: boolean
  warning?: boolean
  info?: boolean
}
