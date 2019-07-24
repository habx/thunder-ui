import styled from 'styled-components'

import borderRadius from '../borderRadius'
import fontSizes from '../fontSizes'
import theme from '../theme'

export const NotificationContainer = styled.div<{
  warning?: boolean
  error?: boolean
}>`
  background-color: ${theme.get('primary', { dynamic: true })};
  border-radius: ${borderRadius.narrow};
  display: flex;
  align-items: flex-start;
  padding: 16px 16px 16px 32px;
  max-width: 500px;
  justify-content: space-between;
  box-shadow: ${theme.get('shadow')};
`

export const NotificationContent = styled.div`
  margin: 0;
  padding: 0 16px 0 0;
  font-size: ${fontSizes.regular};
  line-height: 1.33;
  color: #ffffff;
`

export const CloseContainer = styled.div`
  color: #ffffff;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  justify-self: flex-end;
`
