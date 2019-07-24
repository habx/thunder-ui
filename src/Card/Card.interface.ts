import * as React from 'react'

export default interface CardProps
  extends React.HTMLAttributes<HTMLDivElement> {
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
