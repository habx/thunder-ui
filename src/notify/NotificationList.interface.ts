export type NotificationOptions = {
  type?: 'info' | 'error' | 'warning'
  duration?: number
}

export type StateNotification = {
  message: string
  options: NotificationOptions
  open: boolean
  id: number
}
