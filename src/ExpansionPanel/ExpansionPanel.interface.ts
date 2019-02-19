import { DOMNode } from '../_internal/types'

export default interface ExpansionPanel extends DOMNode {}

export type ExpansionPanelContextType = {
  openedItem: number | null
  setOpenedItem: (newOpenedItem: number | null) => void
}