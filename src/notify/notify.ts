import { dispatch, types } from '../ThunderProvider/ThunderProvider.events'

import { NotificationOptions } from './NotificationList.interface'

const notify = (message: string, options: NotificationOptions = {}) =>
  dispatch(types.NOTIFY, false, message, options)

export default notify
