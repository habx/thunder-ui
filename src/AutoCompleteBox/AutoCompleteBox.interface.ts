import * as React from 'react'

export type option = {
  label: string
  value: any
}

export default interface AutoCompleteBoxProps {
  input: React.ComponentType<any>
  options: any[]
  onPick: (option: option) => void
  onClose: (e: React.MouseEvent<HTMLElement>) => void
  onChange: (e: React.ChangeEvent) => void
  inputRef: React.RefObject<HTMLElement>
}

export interface AutoCompleteBoxState {
  isOpened: boolean
  query: string
  focusedItem: any
  wrapperRect: DOMRect
}
