import { formValue, formOption, Input } from '../_internal/types'

export default interface RadioSelectProps
  extends Input<formValue | formValue[] | null> {
  options: formOption[]
  canBeEmpty?: boolean
  multi?: boolean
}
