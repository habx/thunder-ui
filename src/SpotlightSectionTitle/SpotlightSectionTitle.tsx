import * as React from 'react'

import { SectionTitleContainer } from './SpotlightSectionTitle.style'

const SpotlightSectionTitle: React.FunctionComponent<
  React.HTMLAttributes<HTMLDivElement>
> = ({ children }) => <SectionTitleContainer>{children}</SectionTitleContainer>

export default SpotlightSectionTitle
