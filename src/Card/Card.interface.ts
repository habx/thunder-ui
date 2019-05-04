import * as React from 'react'

import { DOMNode } from '../_internal/types'

export default interface CardProps extends DOMNode {
  title?: string
  subtitle?: string
  interactive?: boolean
  error?: boolean
  warning?: boolean
  headerPosition?: 'inside' | 'outside'
  action?: React.ReactNode
  noPadding?: boolean
  titleCount?: number | string
  backgroundColor?: string
  color?: string
}

export interface CardInnerProps extends CardProps {
  theme?: object
}
