import * as React from 'react'

export default interface SpotlightContentProps {
  placeholder?: string
  inputRef: React.RefObject<any>
  onClose: () => void
  onQueryChange: (query: string) => void
  query: string
  data: object | object[]
}

export interface SpotlightContentState {
  selectedItem: number
}

export interface ItemRegistrationData {
  onSubmit: (e: React.MouseEvent<HTMLInputElement>) => void
  index: number
  key: number
}
