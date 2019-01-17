import * as React from 'react'

import DOMInterface from '../internal/domInterface'

export default interface MenuProps extends DOMInterface {
  triggerElement: React.ReactElement<any>
  position?: 'left' | 'right'
}
