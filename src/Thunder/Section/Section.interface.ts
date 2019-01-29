import * as React from 'react'

import { DOMNode } from '../../_internal/types'
import { thunderContext } from '../../_internal/types'

export default interface SectionProps extends DOMNode {
  name: string,
  title?: React.ReactNode
  maxItems?: number
  render?: (thunder: thunderContext) => React.ReactNode
  renderItem?: (item: any, index: number) => React.ReactNode
  filter?: (query: string, element: any, index: string, elements: Array<any>) => boolean
}

export interface SectionInnerProps extends SectionProps {
  thunder: thunderContext
}
