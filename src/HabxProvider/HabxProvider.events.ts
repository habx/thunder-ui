import { isFunction } from 'lodash'

let subscriptions = {}

export const subscribe = (messageType, callback) => {
  subscriptions[messageType] = callback
}

export const dispatch = (messageType: string, returnPromise: boolean, message: string, options = {}) => {
  if (isFunction(subscriptions[messageType])) {
    return subscriptions[messageType](message, options)
  }

  if (returnPromise) {
    return Promise.reject('unknown event')
  }
}

export const types = {
  CONFIRM_MODAL: 'CONFIRM_MODAL',
  NOTIFY: 'NOTIFY'
}
