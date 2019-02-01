import * as React from 'react'

import { SectionTitleContainer } from './SpotlightSectionTitle.style'
import SpotlightSectionTitleProps from './SpotlightSectionTitle.interface'

const SpotlightSectionTitle: React.StatelessComponent<SpotlightSectionTitleProps> = ({ children }) => (
  <SectionTitleContainer>
    { children }
  </SectionTitleContainer>
)

export default SpotlightSectionTitle
