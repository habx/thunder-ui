import * as React from 'react'

import { DOMNode, spotlightContext } from '../_internal/types'

export default interface SpotlightSectionProps extends DOMNode {
  name: string
  title?: React.ReactNode
  maxItems?: number
  render?: (spotlight: spotlightContext) => React.ReactNode
  renderItem?: (item: any, index: number) => React.ReactNode
  filter?: (
    query: string,
    element: any,
    index: string,
    elements: Array<any>
  ) => boolean
}

export interface SpotlightSectionInnerProps extends SpotlightSectionProps {
  spotlight: spotlightContext
}
