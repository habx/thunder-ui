import * as React from 'react'

import DOMInterface from '../_internal/domInterface'

export default interface NavBarItemProps extends DOMInterface {
  backgroundColor?: string
  activeBackgroundColor?: string
  icon?: React.ReactNode
  tooltip?: React.ReactNode
}
