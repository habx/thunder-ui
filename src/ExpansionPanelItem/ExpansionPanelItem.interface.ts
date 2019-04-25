import * as React from 'react'

import { DOMNode } from '../_internal/types'

export default interface ExpansionPanelItem extends DOMNode {
  title: React.ReactNode
  error?: boolean
  expandIcon?: React.ReactNode
  collapseIcon?: React.ReactNode
  open?: boolean
  onToggle?: () => void
  titleProps?: object
}
