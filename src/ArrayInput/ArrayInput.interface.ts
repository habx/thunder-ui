import * as React from 'react'

import { DOMNode, styledTheme } from '../_internal/types'

import { ItemComponentProps } from './Item.interface'

export default interface ArrayInputProps extends DOMNode {
  items?: any[]
  addButtonLabel?: string
  canBeReordered?: boolean
  disabled?: boolean
  onDelete?: (position: number) => void
  onReorder?: (oldPosition: number, newPosition: number) => void
  onAppend?: () => void
  itemComponent?: React.ComponentType<ItemComponentProps>
  itemTitleComponent?: React.ComponentType<ItemComponentProps>
  renderItem?: (itemProps: ItemComponentProps) => JSX.Element
  renderItemTitle?: (itemProps: ItemComponentProps) => JSX.Element
}

export interface ArrayInputInnerProps extends ArrayInputProps {
  theme: styledTheme
}
