import * as React from 'react'

export default interface NotificationProps
  extends React.HTMLAttributes<HTMLDivElement> {
  onClose?: () => void
  error?: boolean
  warning?: boolean
  closeIcon?: React.ReactNode
}
