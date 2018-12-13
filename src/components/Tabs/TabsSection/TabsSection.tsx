import * as React from 'react'
import styled from 'styled-components'
import color from 'color'
import { fontSizes, colors } from '../../../theme'

import TabsSectionProps from './TabsSection.interface'

const TabsSectionContainer = styled.div`
  display: flex;
  position: relative;
  padding-top: 8px;
`
const TabsSectionLabel = styled.span`
  position: absolute;
  top: 0;
  left: 16px;
  font-size: ${fontSizes.tiny};
  color: ${({ labelColor }) => labelColor || color(colors.maastrichtBlue).fade(0.52).toString()}
`

const TabsContainer = styled.div`
  display: flex;
  overflow-x: auto;
`

const TabsSection: React.StatelessComponent<TabsSectionProps> = ({ children, label, labelColor, ...props }) => (
  <TabsSectionContainer>
    {label && <TabsSectionLabel labelColor={labelColor}>{label}</TabsSectionLabel>}
    <TabsContainer {...props}>
      {children}
    </TabsContainer>
  </TabsSectionContainer>
)

export default TabsSection
