import * as React from 'react'

import { styledTheme } from '../_internal/types'

import { ItemComponentProps } from './Item/Item.interface'

export interface AddButtonComponentProps {
  onAppend: () => void
}

export default interface ArrayInputProps
  extends React.HTMLAttributes<HTMLUListElement> {
  items?: any[]
  addButtonLabel?: string
  addButtonComponent?: React.ComponentType<AddButtonComponentProps>
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
