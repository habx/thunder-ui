import * as React from 'react'
import { withTheme } from 'styled-components'

import InnerThunder from './Thunder'
import ThunderProps from './Thunder.interface'

const EndhancedThunder = withTheme(InnerThunder)

const Thunder: React.StatelessComponent<ThunderProps> = ({ theme, ...props }) => (
  <EndhancedThunder customTheme={theme} {...props} />
)

export default Thunder
