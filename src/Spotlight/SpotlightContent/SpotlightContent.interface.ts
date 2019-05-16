import * as React from 'react'

export type data = any[] | { [key: string]: any[] }

export default interface SpotlightContentProps {
  placeholder?: string
  inputRef: React.RefObject<any>
  onClose: () => void
  onQueryChange: (query: string) => void
  query: string
  data?: data
}

export interface ItemRegistrationData {
  onSubmit: (e: React.MouseEvent<HTMLInputElement>) => void
  index: number
  key: number
}
