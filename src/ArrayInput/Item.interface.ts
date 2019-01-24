import * as React from 'react'
import DOMInterface from '../_internal/domInterface'

export default interface ItemProps extends DOMInterface {
  context: {
    editing: number
    itemComponent: React.ComponentClass<any> | React.StatelessComponent<any>
    itemTitleComponent: React.ComponentClass<any> | React.StatelessComponent<any>
    itemDescriptionComponent: React.ComponentClass<any> | React.StatelessComponent<any>
    addButtonLabel?: string
    items: any[]
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
