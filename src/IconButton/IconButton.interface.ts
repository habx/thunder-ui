import DOMInterface from '../_internal/domInterface'

export default interface IconButtonProps extends DOMInterface {
  color?: string
  small?: boolean
  large?: boolean
  error?: boolean
  warning?: boolean
  info?: boolean
}
