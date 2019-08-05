import * as React from 'react'

import { styledTheme } from '../_internal/types'

export default interface ExpansionPanelItem
  extends React.HTMLAttributes<HTMLDivElement> {
  title?: string
  header?: React.ReactNode
  error?: boolean
  expandIcon?: React.ReactNode
  collapseIcon?: React.ReactNode
  open?: boolean
  onToggle?: (e?: React.MouseEvent) => void
  children?: React.ReactNode | ((config: { open: boolean }) => JSX.Element)
}

export interface ExpansionPanelItemInnerProps extends ExpansionPanelItem {
  theme: styledTheme
}
