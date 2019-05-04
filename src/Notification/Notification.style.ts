import styled from 'styled-components'

import borderRadius from '../borderRadius'
import fontSizes from '../fontSizes'
import theme from '../theme'

export const NotificationContainer = styled.div`
  background-color: ${theme.get('primary', { dynamic: true })};
  border-radius: ${borderRadius.narrow};
  display: flex;

  box-shadow: ${theme.get('shadow')};
`

export const NotificationIllustration = styled.div`
  padding: 16px 0 16px 32px;
  font-size: ${fontSizes.regular};
  color: #ffffff;
`

export const NotificationContent = styled.p`
  padding: 16px 32px;
  margin: 0;
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
