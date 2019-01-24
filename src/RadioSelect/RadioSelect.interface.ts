import DOMInterface from '../_internal/domInterface'
import { formValue, formOption } from '../_internal/types'

export default interface RadioSelectProps extends DOMInterface {
  options: formOption[]
  onChange: (value) => void
  canBeEmpty?: boolean
  isMulti?: boolean
  disabled?: boolean
  value: formValue | formValue[]
  color?: string
}
