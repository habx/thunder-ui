import React from 'react'

export type NotificationOptions = {
  type?: 'info' | 'error' | 'warning'
  duration?: number
  identifier?: string | number
}

export type NotificationMessage =
  | string
  | React.ComponentType<any>
  | React.ReactElement

export type StateNotification = {
  message: string | React.ComponentType<any> | React.ReactElement
  options: NotificationOptions
  open: boolean
  id: string | number
}
