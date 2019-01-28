import * as React from 'react'
import DOMInterface from '../_internal/domInterface'

export default interface ArrayInputProps extends DOMInterface {
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

export interface ArrayInputState {
  editing?: boolean,
  items?: any[],
}
