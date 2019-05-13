import * as React from 'react'

import { styledTheme } from '../_internal/types'

export default interface SpinnerProps
  extends React.HTMLAttributes<HTMLDivElement> {
  size?: number
  color?: string
}

export interface SpinnerInnerProps extends SpinnerProps {
  theme: styledTheme
}
