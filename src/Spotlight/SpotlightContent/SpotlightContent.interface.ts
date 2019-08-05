import * as React from 'react'

import { actionSpotlightState } from '../../SpotlightItem/SpotlightItem.interface'

export type data = { [key: string]: any[] }

export default interface SpotlightContentProps {
  placeholder?: string
  inputRef: React.RefObject<any>
  onClose: () => void
  onQueryChange: (query: string) => void
  query: string
  data?: data
}

export interface ItemRegistrationData {
  onSubmit: (
    e: React.UIEvent<HTMLInputElement>,
    state?: actionSpotlightState
  ) => void
  index: number
  key: number
}
