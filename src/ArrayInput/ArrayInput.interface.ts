import * as React from 'react'

import { DOMNode, styledTheme } from '../_internal/types'

import { ItemComponentProps } from './Item.interface'

export default interface ArrayInputProps extends DOMNode {
  addButtonLabel?: string
  items: any[]
  canBeReordered?: boolean
  disabled?: boolean
  onDelete: (item) => void
  onReorder?: (oldPosition: number, newPosition: number) => void
  onAppend?: () => void
  itemComponent: React.ComponentType<ItemComponentProps>
  itemTitleComponent: React.ComponentType<ItemComponentProps>
  renderItem: (item: ItemComponentProps) => JSX.Element
  renderItemTitle: (item: ItemComponentProps) => JSX.Element
}

export interface ArrayInputInnerProps extends ArrayInputProps {
  theme: styledTheme
}
