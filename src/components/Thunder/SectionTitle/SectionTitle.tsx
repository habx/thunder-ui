import * as React from 'react'

import { SectionTitleContainer } from './SectionTitle.style'
import SectionTitleProps from './SectionTitle.interface'

const SectionTitle: React.StatelessComponent<SectionTitleProps> = ({ children }) => (
  <SectionTitleContainer>
    { children }
  </SectionTitleContainer>
)

export default SectionTitle
