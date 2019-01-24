import * as React from 'react'
import DOMInterface from '../_internal/domInterface'

export default interface ArrayInputProps extends DOMInterface {
  addButtonLabel?: string,
  items: any[]
  itemTitle: (item: any, index: number, params: { editing: boolean }) => JSX.Element | string,
  itemDescription?: (item: any, index: number) => string,
  itemComponent: React.ComponentClass<any> | React.StatelessComponent<any>,
  canBeReordered?: boolean,
  onDelete: (item) => void,
  onReorder?: (oldPosition: number, newPosition: number) => void,
  onAppend?: () => void
}

export interface ArrayInputState {
  editing?: boolean,
  items?: any[],
}
