import * as React from 'react'
import { withTheme } from 'styled-components'

import Thunder from './Thunder'
import ThunderProps from './Thunder.interface'

const EndhancedThunder = withTheme(Thunder)


const Wrapper: React.StatelessComponent<ThunderProps> = ({ theme, ...props }) => (
  <EndhancedThunder customTheme={theme} {...props} />
)

export default Wrapper
