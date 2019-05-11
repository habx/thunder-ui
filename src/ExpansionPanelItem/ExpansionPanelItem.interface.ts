import * as React from 'react'

import { DOMNode, styledTheme } from '../_internal/types'

export default interface ExpansionPanelItem extends DOMNode {
  title?: string
  header?: React.ReactNode
  error?: boolean
  expandIcon?: React.ReactNode
  collapseIcon?: React.ReactNode
  open?: boolean
  onToggle?: () => void
  children?: React.ReactNode | ((config: { open: boolean }) => JSX.Element)
}

export interface ExpansionPanelItemInnerProps extends ExpansionPanelItem {
  theme: styledTheme
}
