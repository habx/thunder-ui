import styled from 'styled-components'

import borderRadius from '../borderRadius'
import theme from '../theme'

export const ExpansionPanelContainer = styled.div`
  &:not([data-flat='true']) {
    box-shadow: ${theme.get('shadow')};
    border-radius: ${borderRadius.narrow};
  }
`
