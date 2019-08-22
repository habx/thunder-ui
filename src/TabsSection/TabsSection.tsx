import * as React from 'react'
import styled from 'styled-components'

import fontSizes from '../fontSizes'
import theme from '../theme'

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
  color: ${theme.get('neutral', { dynamic: true })};
`

const TabsContainer = styled.div`
  display: flex;
  overflow-x: auto;
`

const TabsSection = React.forwardRef<HTMLDivElement, TabsSectionProps>(
  (props, ref) => {
    const { children, label, ...rest } = props

    return (
      <TabsSectionContainer>
        {label && <TabsSectionLabel>{label}</TabsSectionLabel>}
        <TabsContainer {...rest} ref={ref}>
          {children}
        </TabsContainer>
      </TabsSectionContainer>
    )
  }
)

export default TabsSection
