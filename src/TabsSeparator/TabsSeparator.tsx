import * as React from 'react'
import styled from 'styled-components'

import theme from '../theme'

import TabsSeparatorProps from './TabsSeparator.interface'

const TabsSeparator: React.FunctionComponent<TabsSeparatorProps> = styled.div`
  background-color: ${theme.get('neutralLight')};
  height: 32px;
  margin-top: 12px;
  width: 1px;
`

export default TabsSeparator
