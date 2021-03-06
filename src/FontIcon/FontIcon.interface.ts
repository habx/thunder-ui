import * as React from 'react'

export default interface FontIconProps
  extends React.HTMLAttributes<HTMLElement> {
  icon: string
  interactive?: boolean
  title?: string
  size?: number
  color?: string
  warning?: boolean
  error?: boolean
}
