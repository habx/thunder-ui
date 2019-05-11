import { DOMNode } from '../_internal/types'

export default interface ExpansionPanel extends DOMNode {
  multiOpen?: boolean
  disabled?: boolean
}

export type ExpansionPanelContextType = {
  isInsideAnExpansionPanel: boolean
  openedItems: number[]
  setOpenedItems: (newOpenedItem: (prev: number[]) => number[]) => void
  multiOpen?: boolean
}
