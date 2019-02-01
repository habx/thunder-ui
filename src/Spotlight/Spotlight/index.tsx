import * as React from 'react'
import { withTheme } from 'styled-components'

import InnerSpotlight from './Spotlight'
import SpotlightProps from './Spotlight.interface'

const EndhancedSpotlight = withTheme(InnerSpotlight)

const Spotlight: React.StatelessComponent<SpotlightProps> = ({ theme, ...props }) => (
  <EndhancedSpotlight customTheme={theme} {...props} />
)

export default Spotlight
