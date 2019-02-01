import styled from 'styled-components'
import color from 'color'

import borderRadius from '../../borderRadius'
import fontSizes from '../../fontSizes'

import { getMainColor } from '../../_internal/colors'

const prepareProps = props => {
  const backgroundColor = getMainColor(props)

  return {
    backgroundColor,
    shadowColor: color(backgroundColor).fade(0.5)
  }
}

export const NotificationContainer = styled.div.attrs(prepareProps)`
  background-color: ${({ backgroundColor }) => backgroundColor};
  border-radius: ${borderRadius.narrow};
  box-shadow: 0 6px 18px 0 ${({ shadowColor }) => shadowColor};
  display: flex;
`

export const NotificationIllustration = styled.div`
  padding: 16px 0 16px 32px;
  font-size: ${fontSizes.regular};
  color: #ffffff;
`

export const NotificationContent = styled.p`
  padding: 16px 32px;
  font-size: ${fontSizes.regular};
  color: #ffffff;
`

export const CloseContainer = styled.div`
  padding: 8px;
  margin-right: 8px;
  margin-top: 8px;
  color: #ffffff;
  height: fit-content;

  :hover {
    cursor: pointer;
  }
`
