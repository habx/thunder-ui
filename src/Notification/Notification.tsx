import * as React from 'react'

import FontIcon from '../FontIcon'

import NotificationProps from './Notification.interface'
import {
  NotificationContainer,
  NotificationContent,
  CloseContainer,
} from './Notification.style'

const Notification = React.forwardRef<HTMLDivElement, NotificationProps>(
  (props, ref) => {
    const { children, onClose, closeIcon, ...rest } = props

    return (
      <NotificationContainer
        data-testid="notification-container"
        {...rest}
        ref={ref}
      >
        <NotificationContent data-testid="notification-content">
          {children}
        </NotificationContent>
        <CloseContainer onClick={onClose}>
          {closeIcon || <FontIcon icon="close" />}
        </CloseContainer>
      </NotificationContainer>
    )
  }
)

export default Notification
