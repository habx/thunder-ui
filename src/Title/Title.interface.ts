import * as React from 'react'

export default interface TitleProps
  extends React.HTMLAttributes<HTMLHeadingElement> {
  size?: number
  color?: string
  underline?: boolean
  error?: boolean
  warning?: boolean
}
