import * as React from 'react'
import DOMInterface from '../../internal/domInterface'

export default interface SelectProps extends DOMInterface {
  label?: string,
  options: formOptionInterface[],
  value: formValue | formValue[],
  onChange: (value) => void,
  isMulti?: boolean,
  description?: string,
  filledIndicator?: boolean,
  labelClassName?: string,
  icon: React.ReactNode,
  annotation?: string,
  canReset?: boolean,
}
