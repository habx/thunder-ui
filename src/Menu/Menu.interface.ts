import * as React from 'react'

import DOMInterface from '../_internal/domInterface'

export default interface MenuProps extends DOMInterface {
  triggerElement: React.ReactElement<any>
  position?: 'left' | 'right' | 'top-left' | 'top-right'
  persistent?: boolean
}

export interface MenuState {
  open: boolean
}
