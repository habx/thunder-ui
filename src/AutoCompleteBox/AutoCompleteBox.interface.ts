import * as React from 'react'

type option = {
  label: string
  value: any
}

export default interface AutoCompleteBoxProps {
  options: any[]
  onPick: (option: option) => void
  onClose: (e: React.MouseEvent<HTMLElement>) => void
}

export interface AutoCompleteBoxState {
  isOpened: boolean
  query: string
  focusedItem: any
  wrapperRect: DOMRect
}
