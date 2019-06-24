import * as React from 'react'

import { isFunction } from '../_internal/data'

let subscriptions = {}

export const subscribe = (messageType, callback) => {
  subscriptions[messageType] = callback

  return () => {
    subscriptions[messageType] = null
  }
}

export const dispatch = (
  messageType: string,
  returnPromise: boolean,
  message: string | React.ComponentType<any>,
  options = {}
) => {
  if (isFunction(subscriptions[messageType])) {
    return subscriptions[messageType](message, options)
  }

  if (returnPromise) {
    return Promise.reject('unknown event')
  }
}

export const types = {
  CONFIRM_MODAL: 'CONFIRM_MODAL',
  NOTIFY: 'NOTIFY',
}
