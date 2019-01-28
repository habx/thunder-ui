import DOMInterface from '../../_internal/domInterface'

export default interface OptionProps extends DOMInterface {
  focused: boolean
  isMulti: boolean
  label: string
  selected: boolean
}