import { DOMNode } from '../_internal/types'

export default interface ExpansionPanel extends DOMNode {
  flat?: boolean
}

export type ExpansionPanelContextType = {
  openedItem: number | null
  setOpenedItem: (newOpenedItem: number | null) => void
}
