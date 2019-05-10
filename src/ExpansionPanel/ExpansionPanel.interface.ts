import { DOMNode } from '../_internal/types'

export default interface ExpansionPanel extends DOMNode {
  multiOpen?: boolean
  disabled?: boolean
}

export type ExpansionPanelContextType = {
  openedItems: number[]
  setOpenedItems: (newOpenedItem: number[]) => void
  multiOpen?: boolean
}
