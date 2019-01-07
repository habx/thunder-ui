import * as React from 'react'

import DOMInterface from '../../internal/domInterface'
import { formOption, formValue } from '../../internal/types'

export default interface SelectProps extends DOMInterface {
  placeholder?: string
  options: formOption[]
  value: formValue | formValue[]
  onChange: (value) => void
  isMulti?: boolean
  description?: string
  filledIndicator?: boolean
  labelClassName?: string
  icon: React.ReactNode
  annotation?: string
  canReset?: boolean
}
