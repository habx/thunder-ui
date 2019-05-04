import * as React from 'react'

import { DOMNode } from '../_internal/types'

export default interface NavBarItemProps extends DOMNode {
  backgroundColor?: string
  activeBackgroundColor?: string
  icon?: React.ReactNode
  tooltip?: React.ReactNode
  active?: boolean
}
