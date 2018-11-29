import React from 'react'
import styled from 'styled-components'
import color from 'color'
import { fontSizes, colors } from '../../theme'

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

const TabsSection = ({ children, label, labelColor }) => (
  <TabsSectionContainer>
    {label && <TabsSectionLabel labelColor={labelColor}>{label}</TabsSectionLabel>}
    {children}
  </TabsSectionContainer>
)

export default TabsSection
