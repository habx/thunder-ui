import * as React from 'react'

export default interface NotificationProps
  extends React.HTMLAttributes<HTMLDivElement> {
  onClose?: () => void
  backgroundColor?: string
  error?: boolean
  warning?: boolean
  closeIcon?: React.ReactNode
}
