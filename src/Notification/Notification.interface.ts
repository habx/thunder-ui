import * as React from 'react'

import DOMInterface from '../_internal/domInterface'

export default interface NotificationProps extends DOMInterface {
  onClose?: () => void
  illustration?: React.ReactNode
  backgroundColor?: string
  error?: boolean
  warning?: boolean
  closeIcon?: React.ReactNode
}
