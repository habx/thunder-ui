import * as React from 'react'

import { Except, styledAs } from '../_internal/types'

export default interface TabsItemProps
  extends Except<React.LiHTMLAttributes<HTMLLIElement>, 'is'> {
  activeColor?: string
  hoverColor?: string
  closed?: boolean
  active?: boolean
  is?: styledAs
}
