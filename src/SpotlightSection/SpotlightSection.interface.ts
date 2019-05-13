import * as React from 'react'

import { SpotlightContextProps } from '../Spotlight/Spotlight.interface'

type D = React.HTMLAttributes<HTMLDivElement>

export default interface SpotlightSectionProps
  extends Pick<D, Exclude<keyof D, 'title'>> {
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
