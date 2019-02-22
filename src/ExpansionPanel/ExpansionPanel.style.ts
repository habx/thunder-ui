import styled from 'styled-components'

import shadows from '../shadows'
import borderRadius from '../borderRadius'

export const ExpansionPanelContainer = styled.div`
  &:not([data-flat="true"]) {
    box-shadow: ${shadows.strong};
    border-radius: ${borderRadius.narrow};
  }
`
