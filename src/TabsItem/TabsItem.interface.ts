import { DOMNode } from '../_internal/types'

export default interface TabsItemProps extends DOMNode {
  activeColor?: string
  hoverColor?: string
  closed?: boolean
  active?: boolean
}
