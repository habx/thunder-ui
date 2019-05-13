import * as React from 'react'

export default interface ExpansionPanel
  extends React.HTMLAttributes<HTMLUListElement> {
  multiOpen?: boolean
  disabled?: boolean
}

export type ExpansionPanelContextType = {
  isInsideAnExpansionPanel: boolean
  openedItems: number[]
  setOpenedItems: (newOpenedItem: (prev: number[]) => number[]) => void
  multiOpen?: boolean
}
