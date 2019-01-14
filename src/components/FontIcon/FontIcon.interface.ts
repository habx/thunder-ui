import DOMInterface from '../../internal/domInterface'

export default interface FontIconProps extends DOMInterface {
  icon: string,
  interactive?: boolean
  title?: string
}
