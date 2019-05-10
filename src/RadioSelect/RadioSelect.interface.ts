import { formValue, formOption, Input, styledTheme } from '../_internal/types'

export default interface RadioSelectProps
  extends Input<formValue | formValue[]> {
  options: formOption[]
  canBeEmpty?: boolean
  multi?: boolean
}

export interface RadioSelectInnerProps extends RadioSelectProps {
  theme: styledTheme
}
