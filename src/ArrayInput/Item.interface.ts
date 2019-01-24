import * as React from 'react'
import DOMInterface from '../_internal/domInterface'

export default interface ItemProps extends DOMInterface {
  context: {
    editing: number
    itemComponent: React.ComponentClass<any> | React.StatelessComponent<any>
    itemDescription: (item, index) => string
    addButtonLabel?: string
    items: any[]
    itemTitle: (item: any, index: number, params: { editing: boolean }) => JSX.Element | string
    canBeReordered?: boolean
    onDelete: (item) => void
    onReorder?: (oldPosition: number, newPosition: number) => void
    onClose: (index) => void
    onOpen: (index) => void
    amount?: number
  }
  index: number
  item: any
}
