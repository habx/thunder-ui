import styled from 'styled-components'

import zIndex from '../_internal/zIndex'
import BaseNotification from '../Notification'

export const ANIMATION_DURATION = 500

export const NotificationListContainer = styled.div`
  position: fixed;
  right: 20px;
  top: 20px;
  z-index: ${zIndex.highest};
`

export const Notification = styled(BaseNotification)`
  @keyframes fadein {
    from {
      transform: translateX(520px);
    }
    to {
      transform: translateX(0px);
    }
  }

  margin-bottom: 16px;
  animation: fadein ${ANIMATION_DURATION}ms ease-in-out;
  transition: transform ${ANIMATION_DURATION}ms ease-in-out;

  &[data-closing='true'] {
    transform: translateX(520px);
  }
`
