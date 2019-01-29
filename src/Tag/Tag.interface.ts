import { DOMNode } from '../_internal/types'

export default interface TagProps extends DOMNode {
  bold?: boolean
  colorSeed?: string
  color?: string
}
