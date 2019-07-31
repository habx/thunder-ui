import * as React from 'react'

import { styledAs } from '../_internal/types'

export default interface TagProps extends React.HTMLAttributes<HTMLDivElement> {
  bold?: boolean
  colorSeed?: string
  color?: string
  as?: styledAs
}
