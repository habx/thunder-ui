import * as React from 'react'

import { DOMNode } from '../_internal/types'

export default interface ListProps extends DOMNode {
  itemsAs?: React.ComponentType<any> | string
  hoverColor?: string
  clickable?: boolean
  selectable?: boolean
  children: React.ReactElement<any>[]
}
