import DOMInterface from '../_internal/domInterface'

export default interface FontIconProps extends DOMInterface {
  icon: string,
  interactive?: boolean
  title?: string
  size?: number
  color?: string
}
