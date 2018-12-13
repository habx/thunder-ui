import DOMInterface from '../../internal/domInterface'

export default interface ButtonProps extends DOMInterface {
  warning?: boolean
  disabled?: boolean
  small?: boolean
  backgroundColor?: string
  iconLeft?: string
  iconRight?: string
  reverse?: boolean
}
