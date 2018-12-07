import DOMInterface from '../../internal/domInterface'

export default interface CardProps extends DOMInterface {
  title?: string
  subtitle?: string
  interactive?: boolean
}
