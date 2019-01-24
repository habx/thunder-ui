import * as React from 'react'
import DOMInterface from '../_internal/domInterface'

export default interface ArrayInputProps extends DOMInterface {
  addButtonLabel?: string
  items: any[]
  itemComponent: React.ComponentClass<any> | React.StatelessComponent<any>,
  itemTitleComponent: React.ComponentClass<any> | React.StatelessComponent<any>
  itemDescriptionComponent?: React.ComponentClass<any> | React.StatelessComponent<any>
  canBeReordered?: boolean
  onDelete: (item) => void
  onReorder?: (oldPosition: number, newPosition: number) => void
  onAppend?: () => void
}

export interface ArrayInputState {
  editing?: boolean,
  items?: any[],
}
