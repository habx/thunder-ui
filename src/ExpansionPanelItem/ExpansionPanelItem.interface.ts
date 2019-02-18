import * as React from 'react'

import { DOMNode } from '../_internal/types'

export default interface ExpansionPanelItem extends DOMNode {
  title: React.ReactNode
  expandIcon?: React.ReactNode
  collapseIcon?: React.ReactNode
}
