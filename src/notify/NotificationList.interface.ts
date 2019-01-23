export type NotificationOptions = {
  type?: 'info' | 'error' | 'warning'
  duration?: number
}

export type Notification = {
  message: string
  options: NotificationOptions
  open: boolean
  id: number
}

export default interface NotificationListProps {}

export interface NotificationListState {
  notifications: Notification[]
}
