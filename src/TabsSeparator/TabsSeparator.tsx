import * as React from 'react'
import styled from 'styled-components'

import theme from '../theme'

const TabsSeparator: React.FunctionComponent<
  React.HTMLAttributes<HTMLDivElement>
> = styled.div`
  background-color: ${theme.get('neutralLight')};
  height: 32px;
  margin-top: 12px;
  width: 1px;
`

export default TabsSeparator
