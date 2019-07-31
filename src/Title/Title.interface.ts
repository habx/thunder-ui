import * as React from 'react'

import { styledAs } from '../_internal/types'

export default interface TitleProps
  extends React.HTMLAttributes<HTMLHeadingElement> {
  size?: number
  color?: string
  underline?: boolean
  error?: boolean
  warning?: boolean
  as?: styledAs
}
