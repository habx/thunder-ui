import * as React from 'react'

import { DOMNode } from '../_internal/types'

export default interface NotificationProps extends DOMNode {
  onClose?: () => void
  backgroundColor?: string
  error?: boolean
  warning?: boolean
  closeIcon?: React.ReactNode
}
