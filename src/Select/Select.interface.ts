import * as React from 'react'

import DOMInterface from '../_internal/domInterface'
import { formOption, formValue } from '../_internal/types'

export default interface SelectProps extends DOMInterface {
  placeholder?: string
  options: formOption[]
  value: formValue | formValue[]
  onChange: (value) => void
  isMulti?: boolean
  description?: string
  filledIndicator?: boolean
  placeholderClassName?: string
  icon?: React.ReactNode
  annotation?: string
  canReset?: boolean
}

export interface SelectState {
  open: boolean,
  search: string,
  isInputFocus: boolean,
  focusedItem: any,
  rawOptions: [any],
  rawValue: any,
  options: formOption[],
  value: any | any[]
}
