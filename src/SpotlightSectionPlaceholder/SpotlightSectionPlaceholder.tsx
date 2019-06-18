import * as React from 'react'
import styled from 'styled-components'

import SpotlightSectionPlaceholderProps from './SpotlightSectionPlaceholder.interface'

const SpotlightSectionPlaceholder: React.FunctionComponent<
  SpotlightSectionPlaceholderProps
> = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 16px;
  font-size: 24px;
`

export default SpotlightSectionPlaceholder
