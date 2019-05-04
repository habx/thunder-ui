import * as React from 'react'

import SpotlightSectionTitleProps from './SpotlightSectionTitle.interface'
import { SectionTitleContainer } from './SpotlightSectionTitle.style'

const SpotlightSectionTitle: React.StatelessComponent<
  SpotlightSectionTitleProps
> = ({ children }) => <SectionTitleContainer>{children}</SectionTitleContainer>

export default SpotlightSectionTitle
