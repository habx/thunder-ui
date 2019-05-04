import get from 'lodash.get'
import memoize from 'lodash.memoize'
import * as React from 'react'

import { subscribe, types } from '../ThunderProvider/ThunderProvider.events'

import NotificationListProps, {
  NotificationListState,
} from './NotificationList.interface'
import {
  NotificationListContainer,
  Notification,
  ANIMATION_DURATION,
} from './NotificationList.style'

class NotificationList extends React.PureComponent<
  NotificationListProps,
  NotificationListState
> {
  state = {
    notifications: [],
  }

  componentDidMount() {
    subscribe(types.NOTIFY, (message, options) => {
      const id = Math.random()

      this.setState(prevState => ({
        notifications: [
          ...prevState.notifications,
          { message, options, open: true, id },
        ],
      }))

      if (options.duration !== 0) {
        setTimeout(this.handleClose(id), options.duration || 5000)
      }
    })
  }

  handleClose = memoize(id => () => {
    this.setState(
      prevState => ({
        notifications: prevState.notifications.map(el =>
          el.id === id ? { ...el, open: false } : el
        ),
      }),
      () => this.handleNotificationClose(id)
    )
  })

  handleNotificationClose(id) {
    setTimeout(() => {
      this.setState(prevState => ({
        notifications: prevState.notifications.filter(el => el.id !== id),
      }))
    }, ANIMATION_DURATION)
  }

  render() {
    const { notifications } = this.state

    return (
      <NotificationListContainer>
        {notifications.map(notification => (
          <Notification
            key={notification.id}
            error={get(notification, 'options.type') === 'error'}
            warning={get(notification, 'options.type') === 'warning'}
            onClose={this.handleClose(notification.id)}
            data-closing={!notification.open}
          >
            {notification.message}
          </Notification>
        ))}
      </NotificationListContainer>
    )
  }
}

export default NotificationList
