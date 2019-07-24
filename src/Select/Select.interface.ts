import * as React from 'react'

import { Input, formOption, styledTheme, Except } from '../_internal/types'

export default interface SelectProps
  extends Input<any>,
    Except<React.HTMLAttributes<HTMLDivElement>, keyof Input<any>> {
  options: any[]
  description?: string
  placeholderClassName?: string
  icon?: React.ReactNode
  valueFormat?: 'full' | 'simple'

  annotation?: string
  canReset?: boolean
  filterable?: boolean
  compact?: boolean
  multi?: boolean
  canSelectAll?: boolean
  selectAllLabel?: string

  optionDisabled?: (option: any) => boolean
}

export interface SelectInnerProps extends SelectProps {
  theme: styledTheme
}

export interface SelectState {
  isOpened: boolean
  query: string
  focusedItem: any
  options: formOption[]
  value: formOption | formOption[]
  wrapperRect: DOMRect
}
