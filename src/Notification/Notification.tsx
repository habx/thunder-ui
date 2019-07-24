import * as React from 'react'

import FontIcon from '../FontIcon'

import NotificationProps from './Notification.interface'
import {
  NotificationContainer,
  NotificationContent,
  CloseContainer,
} from './Notification.style'

const Notification: React.FunctionComponent<NotificationProps> = ({
  children,
  onClose,
  closeIcon,
  error,
  warning,
  ...props
}) => (
  <NotificationContainer
    data-testid="notification-container"
    error={error}
    warning={warning}
    {...props}
  >
    <NotificationContent data-testid="notification-content">
      {children}
    </NotificationContent>
    <CloseContainer onClick={onClose}>
      {closeIcon || <FontIcon icon="close" />}
    </CloseContainer>
  </NotificationContainer>
)

export default Notification
