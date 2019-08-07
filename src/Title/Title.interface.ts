import * as React from 'react'

import { styledAs } from '../_internal/types'

export default interface TitleProps
  extends React.HTMLAttributes<HTMLHeadingElement> {
  size?: 1 | 2 | 3 | 4
  color?: string
  underline?: boolean
  error?: boolean
  warning?: boolean
  as?: styledAs
}
