import * as React from 'react'

import { DOMNode } from '../_internal/types'

type themeType = {
  background?: string
  border?: string
  text?: string

  section?: {
    title?: string
  }

  item?: {
    title?: string
    subtitle?: string
    focus?: string
    actionIcon?: string
    icon?: React.ReactNode
    iconBackground?: string
    highlight?: string
    subtitleFont?: string
  },

  welcome?: {
    background?: string
    color?: string
  }
}

export default interface SpotlightProps extends DOMNode {
  query?: string
  data?: Array<any> | object
  open?: boolean
  onOpen?: () => void
  onQueryChange?: (query: string) => void
  placeholder?: string
  theme?: themeType
}

export interface SpotlightInnerProps extends SpotlightProps {
  customTheme?: themeType
  theme: themeType
}
