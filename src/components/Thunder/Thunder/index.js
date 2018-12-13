import * as React from 'react'
import { withTheme } from 'styled-components'

import Thunder from './Thunder'

const EndhancedThunder = withTheme(Thunder)


const Wrapper = ({ theme, ...props }) => <EndhancedThunder customTheme={theme} {...props} />

export default Wrapper
