import styled from 'styled-components'

import theme from '../theme'
import borderRadius from '../borderRadius'

export const ExpansionPanelContainer = styled.div`
  &:not([data-flat="true"]) {
    box-shadow: ${theme.get('shadow')};
    border-radius: ${borderRadius.narrow};
  }
`
