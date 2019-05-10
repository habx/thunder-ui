import * as React from 'react'
import styled from 'styled-components'

import { DOMNode } from '../_internal/types'

const SectionPlaceholder: React.FunctionComponent<DOMNode> = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 16px;
  font-size: 24px;
`

export default SectionPlaceholder
