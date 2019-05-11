import * as React from 'react'

import { DOMNode, styledTheme } from '../_internal/types'

export default interface NavBarProps extends DOMNode {
  backgroundColor?: string
  activeBackgroundColor?: string
  title?: React.ReactElement<any>
}

export interface NavBarInnerProps extends NavBarProps {
  theme: styledTheme
}

export interface NavBarContextProps {
  isInsideANavBar: boolean
  activeBackgroundColor?: string
}
