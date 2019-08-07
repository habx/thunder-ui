import * as React from 'react'

import { styledAs } from '../_internal/types'

export default interface TabsItemProps
  extends React.LiHTMLAttributes<HTMLLIElement> {
  activeColor?: string
  hoverColor?: string
  closed?: boolean
  active?: boolean
  as?: styledAs
}
