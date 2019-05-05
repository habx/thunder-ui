import * as React from 'react'

import FontIcon from '../FontIcon'

import NotificationProps from './Notification.interface'
import {
  NotificationContainer,
  NotificationIllustration,
  NotificationContent,
  CloseContainer,
} from './Notification.style'

const Notification: React.StatelessComponent<NotificationProps> = ({
  children,
  onClose,
  illustration,
  backgroundColor,
  closeIcon,
  error,
  warning,
  ...props
}) => (
  <NotificationContainer
    data-testid="notification-container"
    backgroundColor={backgroundColor}
    error={error}
    warning={warning}
    {...props}
  >
    {illustration && (
      <NotificationIllustration>{illustration}</NotificationIllustration>
    )}
    <NotificationContent data-testid="notification-content">
      {children}
    </NotificationContent>
    <CloseContainer onClick={onClose}>
      {closeIcon || <FontIcon icon="close" />}
    </CloseContainer>
  </NotificationContainer>
)

Notification.defaultProps = {
  onClose: () => null,
  illustration: null,
  backgroundColor: null,
  closeIcon: null,
  error: false,
  warning: false,
}

export default Notification
