import * as React from 'react'

import { dispatch, types } from '../ThunderProvider/ThunderProvider.events'

import { NotificationOptions } from './NotificationList.interface'

const notify = (
  message: string | React.ComponentType<any> | React.ReactElement,
  options: NotificationOptions = {}
) => dispatch(types.NOTIFY, false, message, options)

export default notify
