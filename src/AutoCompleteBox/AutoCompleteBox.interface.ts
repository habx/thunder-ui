import * as React from 'react'

export type option = {
  label: string
  value: any
}

export default interface AutoCompleteBoxProps {
  inputComponent?: React.ComponentType<any>
  options?: option[]
  value?: string
  onChange: (e: React.ChangeEvent) => void
}

export interface AutoCompleteBoxState {
  isOpened: boolean
  focusedItem: any
  wrapperRect: DOMRect
}
