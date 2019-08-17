import * as React from 'react'

import {
  Input,
  formOption,
  styledTheme,
  Except,
  formValue,
} from '../_internal/types'

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
  wrapperRect: ClientRect
}

export enum ActionType {
  UpdateQuery = 'UPDATE_QUERY',
  ToggleVisibility = 'TOGGLE_VISIBILITY',
  RemoveFocusItem = 'REMOVE_FOCUS_ITEM',
  AddFocusItem = 'ADD_FOCUS_ITEM',
  Resize = 'RESIZE',
}

export interface SelectAction {
  type: ActionType
  value?: any
}
