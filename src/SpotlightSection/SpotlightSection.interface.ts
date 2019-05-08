import * as React from 'react'

import { DOMNode } from '../_internal/types'
import { SpotlightContextProps } from '../Spotlight/Spotlight.interface'

export default interface SpotlightSectionProps extends DOMNode {
  name: string
  title?: React.ReactNode
  maxItems?: number
  render?: (spotlight: SpotlightContextProps) => React.ReactNode
  renderItem?: (item: any, index: number) => React.ReactNode
  filter?: (
    query: string,
    element: any,
    index: string,
    elements: Array<any>
  ) => boolean
}

export interface SpotlightSectionContextProps {
  name: string
}
