import styled from 'styled-components'

import borderRadius from '../borderRadius'
import Modal from '../Modal'
import theme from '../theme'

export const SpotlightModal = styled(Modal)`
  background-color: ${theme.get('neutralLightest')};
  width: 600px;
  border-radius: ${borderRadius.wide};
  padding: 0 0 16px;
  max-height: 70vh;
  display: flex;
  flex-direction: column;
`
