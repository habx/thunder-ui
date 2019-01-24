import * as React from 'react'
import DOMInterface from '../_internal/domInterface'

export default interface CardProps extends DOMInterface {
  title?: string
  subtitle?: string
  interactive?: boolean
  headerPosition?: 'inside' | 'outside'
  action?: React.ReactNode
  titleCount?: number
}
