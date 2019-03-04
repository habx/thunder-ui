import * as React from 'react'

import { DOMNode } from '../_internal/types'

export default interface ListItemProps extends DOMNode {
  as?: React.ComponentType<any> | string
  selected: boolean
  rightElement: React.ReactNode
}
