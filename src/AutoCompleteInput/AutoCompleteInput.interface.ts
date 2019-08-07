import * as React from 'react'

export type option = {
  label: string
  value: any
}

export default interface AutoCompleteInputProps {
  inputComponent?: React.ComponentType<any>
  options?: option[]
  value?: string
  onChange: (e: React.ReactText) => void
}

export interface AutoCompleteInputState {
  isOpened: boolean
  focusedItem: any
  wrapperRect: DOMRect
}
