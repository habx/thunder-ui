import DOMInterface from '../_internal/domInterface'

export default interface TextAreaProps extends DOMInterface {
  color?: string
  borderColor?: string
  errorColor?: string
  value?: string | number
}
