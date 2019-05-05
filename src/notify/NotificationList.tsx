import get from 'lodash.get'
import * as React from 'react'

import { useIsMounted } from '../_internal/hooks'
import { subscribe, types } from '../ThunderProvider/ThunderProvider.events'

import { StateNotification } from './NotificationList.interface'
import {
  NotificationListContainer,
  Notification,
  ANIMATION_DURATION,
} from './NotificationList.style'

const NotificationList: React.StatelessComponent<{}> = () => {
  const isMounted = useIsMounted()

  const [notifications, setNotifications] = React.useState(
    [] as StateNotification[]
  )

  const handleClose = React.useCallback(
    notification => {
      if (isMounted.current) {
        setNotifications(prev =>
          prev.map(el =>
            el.id === notification.id ? { ...el, open: false } : el
          )
        )

        setTimeout(() => {
          if (isMounted.current) {
            setNotifications(prev =>
              prev.filter(el => el.id !== notification.id)
            )
          }
        }, ANIMATION_DURATION)
      }
    },
    [isMounted]
  )

  React.useEffect(
    () =>
      subscribe(types.NOTIFY, (message, options) => {
        const notification = { message, options, open: true, id: Math.random() }

        setNotifications(prev => [...prev, notification])

        if (options.duration !== 0) {
          setTimeout(() => handleClose(notification), options.duration || 5000)
        }
      }),
    [handleClose]
  )

  return (
    <NotificationListContainer>
      {notifications.map(notification => (
        <Notification
          key={notification.id}
          error={get(notification, 'options.type') === 'error'}
          warning={get(notification, 'options.type') === 'warning'}
          onClose={() => handleClose(notification)}
          data-closing={!notification.open}
        >
          {notification.message}
        </Notification>
      ))}
    </NotificationListContainer>
  )
}

export default NotificationList
