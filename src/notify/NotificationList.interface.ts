import React from 'react'

export type NotificationOptions = {
  type?: 'info' | 'error' | 'warning'
  duration?: number
}

export type StateNotification = {
  message: string | React.ComponentType<any> | React.ReactElement
  options: NotificationOptions
  open: boolean
  id: number
}
