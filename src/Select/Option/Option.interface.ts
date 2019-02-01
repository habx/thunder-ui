import { DOMNode } from '../../_internal/types'

export default interface OptionProps extends DOMNode {
  focused: boolean
  multi: boolean
  compact: boolean
  label: string
  selected: boolean
}
