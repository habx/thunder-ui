import React from 'react'

export type NotificationOptions = {
  type?: 'info' | 'error' | 'warning'
  duration?: number
}

export type StateNotification = {
  message: string | React.ComponentType<any>
  options: NotificationOptions
  open: boolean
  id: number
}
