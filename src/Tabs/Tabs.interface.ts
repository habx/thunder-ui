import { DOMNode } from '../_internal/types'

export default interface TabsProps extends DOMNode {
  hoverColor?: string
  activeColor?: string
  color?: string
}

export interface TabsContextProps extends DOMNode {
  isInsideATabs: boolean
  hoverColor?: string
  activeColor?: string
  color?: string
}
