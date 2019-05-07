import { DOMNode } from '../_internal/types'

export interface ItemComponentProps {
  value: any
  index: number
  editing: boolean
}

export default interface ItemProps extends DOMNode {
  index: number
  open: boolean
  item: any
  disabled?: boolean
  canBeReordered?: boolean
  renderItem: (item: ItemComponentProps) => JSX.Element
  renderItemTitle: (item: ItemComponentProps) => JSX.Element
  onReorder?: (oldPosition: number, newPosition: number) => void
  onDelete: (item) => void
}
