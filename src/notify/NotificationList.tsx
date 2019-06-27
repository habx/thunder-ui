import get from 'lodash.get'
import * as React from 'react'

import { isString } from '../_internal/data'
import { useIsMounted, useTimeout } from '../_internal/hooks'
import { isClientSide } from '../_internal/ssr'
import { subscribe, types } from '../ThunderProvider/ThunderProvider.events'

import {
  NotificationMessage,
  NotificationOptions,
  StateNotification,
} from './NotificationList.interface'
import {
  addLocalStorageNotificationId,
  getLocalStorageNotificationsRemovedIdsFromEvent,
  LOCAL_STORAGE_KEY,
  removeLocalStorageNotificationId,
} from './NotificationList.localStorage'
import {
  NotificationListContainer,
  Notification,
  ANIMATION_DURATION,
} from './NotificationList.style'

const NotificationList: React.FunctionComponent<{}> = () => {
  const isMounted = useIsMounted()
  const registerTimeout = useTimeout()

  const [notifications, setNotifications] = React.useState<StateNotification[]>(
    []
  )

  const handleClose = React.useCallback(
    (notification: StateNotification) => {
      if (isMounted.current) {
        setNotifications(prev =>
          prev.map(el =>
            el.id === notification.id ? { ...el, open: false } : el
          )
        )
        if (notification.options.identifier) {
          removeLocalStorageNotificationId(notification.options.identifier)
        }

        registerTimeout(
          setTimeout(() => {
            if (isMounted.current) {
              setNotifications(prev =>
                prev.filter(el => el.id !== notification.id)
              )
            }
          }, ANIMATION_DURATION)
        )
      }
    },
    [isMounted, registerTimeout]
  )

  React.useEffect(
    () =>
      subscribe(
        types.NOTIFY,
        (message: NotificationMessage, options: NotificationOptions) => {
          const notification = {
            message,
            options,
            open: true,
            id: Math.random(),
          }

          setNotifications(prev => [...prev, notification])

          if (options.identifier) {
            addLocalStorageNotificationId(options.identifier)
          }

          if (options.duration !== 0) {
            registerTimeout(
              setTimeout(
                () => handleClose(notification),
                options.duration || 5000
              )
            )
          }
        }
      ),
    [registerTimeout, handleClose]
  )

  const isInClientSide = isClientSide()
  React.useEffect(() => {
    const hasNotificationWithIdentifier = notifications.some(
      notification => notification.options.identifier
    )
    if (isInClientSide && hasNotificationWithIdentifier) {
      const handleStorageChange: EventListener = (e: StorageEvent) => {
        if (e.key === LOCAL_STORAGE_KEY) {
          const removedIds = getLocalStorageNotificationsRemovedIdsFromEvent(e)
          removedIds.forEach(id => {
            const removedNotification = notifications.find(
              notification => notification.options.identifier === id
            )
            if (removedNotification) {
              handleClose(removedNotification)
            }
          })
        }
      }
      window.addEventListener('storage', handleStorageChange)
      return () => window.removeEventListener('storage', handleStorageChange)
    }
  }, [handleClose, isInClientSide, notifications])

  return (
    <NotificationListContainer>
      {notifications.map(notification => {
        const NotificationContent = notification.message as React.ComponentType
        return (
          <Notification
            key={notification.id}
            error={get(notification, 'options.type') === 'error'}
            warning={get(notification, 'options.type') === 'warning'}
            onClose={() => handleClose(notification)}
            data-closing={!notification.open}
          >
            {isString(notification.message) ||
            React.isValidElement(notification.message) ? (
              notification.message
            ) : (
              <NotificationContent />
            )}
          </Notification>
        )
      })}
    </NotificationListContainer>
  )
}

export default NotificationList
