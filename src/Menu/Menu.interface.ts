import * as React from 'react'

import { DOMNode } from '../_internal/types'

export default interface MenuProps extends DOMNode {
  triggerElement: React.ReactElement<any>
  position?: 'left' | 'right' | 'top-left' | 'top-right'
  persistent?: boolean
}

export interface MenuState {
  open: boolean
}
