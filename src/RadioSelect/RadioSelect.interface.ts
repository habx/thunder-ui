import { formValue, formOption, Input } from '../_internal/types'

export default interface RadioSelectProps extends Input<formValue | formValue[]> {
  options: formOption[]
  canBeEmpty?: boolean
  multi?: boolean
}
