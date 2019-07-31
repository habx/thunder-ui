import styled from 'styled-components'

import BaseNotification from '../Notification'
import zIndex from '../zIndex'

export const ANIMATION_DURATION = 500

export const NotificationListContainer = styled.div`
  position: fixed;
  right: 20px;
  top: 20px;
  z-index: ${zIndex.highest};
`

const PADDING = '16px 16px 16px 32px'
const MAX_HEIGHT = '200px'
const MARGIN_BOTTOM = '16px'

export const Notification = styled(BaseNotification)`
  padding: ${PADDING};
  @keyframes fadein {
    from {
      transform: translateX(520px);
    }
    to {
      transform: translateX(0px);
    }
  }

  @keyframes fadeout {
    0% {
      max-height: ${MAX_HEIGHT};
      margin-bottom: ${MARGIN_BOTTOM};
      transform: translateX(0px);
      padding: ${PADDING};
    }
    50% {
      max-height: ${MAX_HEIGHT};
      margin-bottom: ${MARGIN_BOTTOM};
      transform: translateX(520px);
      padding: ${PADDING};
    }
    100% {
      padding: 0;
      max-height: 0;
      margin-bottom: 0;
      transform: translateX(520px);
    }
  }

  margin-bottom: ${MARGIN_BOTTOM};
  animation: fadein ${ANIMATION_DURATION}ms ease-in-out;

  &[data-closing='true'] {
    animation: fadeout ${ANIMATION_DURATION * 2}ms ease-in-out;
    max-height: 0;
    margin-bottom: 0;
    transform: translateX(520px);
    padding: 0;
  }
`
