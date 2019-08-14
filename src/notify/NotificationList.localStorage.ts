import { isClientSide } from '../_internal/ssr'

export const LOCAL_STORAGE_KEY = 'thunder_notifications'
export const getLocalStorageNotificationIds = () => {
  if (isClientSide) {
    try {
      return JSON.parse(
        window.localStorage.getItem(LOCAL_STORAGE_KEY) || '{}'
      ) as {
        [key: string]: string | number
      }
    } catch (e) {}
  }
  return {}
}

export const addLocalStorageNotificationId = (id: string | number) => {
  if (isClientSide) {
    const notificationIds = getLocalStorageNotificationIds()
    try {
      window.localStorage.setItem(
        LOCAL_STORAGE_KEY,
        JSON.stringify({ ...notificationIds, [id]: true })
      )
    } catch (e) {}
  }
}
export const removeLocalStorageNotificationId = (id: string | number) => {
  if (isClientSide) {
    const notificationIds = getLocalStorageNotificationIds()
    delete notificationIds[id]
    try {
      window.localStorage.setItem(
        LOCAL_STORAGE_KEY,
        JSON.stringify(notificationIds)
      )
    } catch (e) {}
  }
}

export const getLocalStorageNotificationsRemovedIdsFromEvent = (
  e: StorageEvent
): string[] => {
  let removedIds: string[] = []
  try {
    const oldValue = JSON.parse(e.oldValue || '{}')
    const newValue = JSON.parse(e.newValue || '{}')
    Object.keys(oldValue).forEach(id => {
      if (!newValue[id]) {
        removedIds.push(id)
      }
    })
  } catch (e) {}
  return removedIds
}
