import * as React from 'react'

import { DOMNode, styledTheme } from '../_internal/types'

export default interface ArrayInputProps extends DOMNode {
  addButtonLabel?: string
  items: any[]
  itemComponent: React.ComponentType<any>
  itemTitleComponent: React.ComponentType<any>
  itemDescriptionComponent?: React.ComponentType<any>
  canBeReordered?: boolean
  disabled?: boolean
  onDelete: (item) => void
  onReorder?: (oldPosition: number, newPosition: number) => void
  onAppend?: () => void
}

export interface ArrayInputInnerProps extends ArrayInputProps {
  theme: styledTheme
}

export interface ArrayInputState {
  editing?: boolean
  items?: any[]
}
