import { DOMNode } from '../_internal/types'

export default interface ExpansionPanel extends DOMNode {
  flat?: boolean
  multiOpen?: boolean
}

export type ExpansionPanelContextType = {
  openedItems: number[]
  setOpenedItems: (newOpenedItem: number[]) => void
  multiOpen?: boolean
}
