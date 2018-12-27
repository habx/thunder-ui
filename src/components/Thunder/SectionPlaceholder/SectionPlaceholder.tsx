import * as React from 'react'
import styled from 'styled-components'

import SectionPlaceholderProps from './SectionPlaceholder.interface'

const SectionPlaceholder: React.StatelessComponent<SectionPlaceholderProps> = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 16px;
  font-size: 24px;
`

export default SectionPlaceholder
