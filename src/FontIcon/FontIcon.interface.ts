import { DOMNode } from '../../_internal/types'

export default interface FontIconProps extends DOMNode {
  icon: string,
  interactive?: boolean
  title?: string
  size?: number
  color?: string
}
