import * as React from 'react'
import DOMInterface from '../_internal/domInterface'

export default interface ItemProps extends DOMInterface {
  context: {
    editing: number
    itemComponent: React.ComponentType<any>
    itemTitleComponent: React.ComponentType<any>
    itemDescriptionComponent: React.ComponentType<any>
    addButtonLabel?: string
    items: any[]
    canBeReordered?: boolean
    disabled?: boolean
    amount?: number
    onClose: (index) => void
    onOpen: (index) => void
    onDelete: (item) => void
    onReorder?: (oldPosition: number, newPosition: number) => void
  }
  index: number
  item: any
}
