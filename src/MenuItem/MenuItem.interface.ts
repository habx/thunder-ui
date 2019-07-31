import * as React from 'react'

import { styledAs } from '../_internal/types'

export default interface MenuItemProps
  extends React.LiHTMLAttributes<HTMLLIElement> {
  icon?: React.ReactNode
  disabled?: boolean
  as?: styledAs
}
