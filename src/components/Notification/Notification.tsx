import styled from 'styled-components'
import * as React from 'react'
import PropTypes from 'prop-types'
import color from 'color'

import { fontSizes, borderRadius, colors } from '../../theme'

const NotificationContainer = styled.div`
  background-color: ${({ backgroundColor, error, warning }) => {
    if (error) {
      return colors.popstar
    }
    if (warning) {
      return colors.uscGold
    }
    return colors.brightCerualean || backgroundColor
  }};
  border-radius: ${borderRadius.narrow};
  box-shadow: ${({ backgroundColor, error, warning }) => {
    if (error) {
      return `0 6px 18px 0 ${color(colors.popstar).fade(0.5)}`
    }
    if (warning) {
      return `0 6px 18px 0 ${color(colors.uscGold).fade(0.5)}`
    }
    return `0 6px 18px 0 ${color(colors.brightCerualean || backgroundColor).fade(0.5)}`
  }};
  display: flex;
`

const NotificationIllustration = styled.div`
  padding: 16px 0 16px 32px;
  font-size: ${fontSizes.regular};
  color: #ffffff;
`

const NotificationContent = styled.p`
  padding: 16px 32px;
  font-size: ${fontSizes.regular};
  color: #ffffff;
`

const CloseIcon = styled.i`
  :before {
    font: normal normal normal 16px/1 'Habx';
    font-size: ${fontSizes.regular};
    content: "\u274C";
  }
`
const CloseContainer = styled.div`
  padding: 8px;
  margin-right: 8px;
  margin-top: 8px;
  color: #ffffff;
  height: fit-content;
  
  :hover {
    cursor: pointer;
  }
`

interface NotificationProps extends React.HTMLAttributes<Element> {
  onClose?: () => void
  illustration?: React.ReactNode
  backgroundColor?: string
  error?: boolean
  warning?: boolean
  closeIcon?: React.ReactNode
}

const Notification: React.FC<NotificationProps> = ({
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
    backgroundColor={backgroundColor}
    error={error}
    warning={warning}
    {...props}
  >
    {illustration && <NotificationIllustration>{illustration}</NotificationIllustration>}
    <NotificationContent>{children}</NotificationContent>
    <CloseContainer onClick={onClose}>
      {closeIcon || <CloseIcon />}
    </CloseContainer>
  </NotificationContainer>
)

Notification.defaultProps = {
  onClose: () => {},
  illustration: null,
  backgroundColor: null,
  closeIcon: null,
  error: false,
  warning: false,
}


export default Notification
