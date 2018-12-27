import * as React from 'react'
import styled from 'styled-components'

import { Context } from './context'

import TabsProps from './Tabs.interface'

const TabsContainer = styled.div`
  display: flex;
  &:hover {
    cursor: pointer;
  }
`

const Tabs: React.StatelessComponent<TabsProps> = ({ color, hoverColor, activeColor, children, ...other }) => (
  <Context.Provider value={{ hoverColor, activeColor, color }}>
    <TabsContainer {...other}>{children}</TabsContainer>
  </Context.Provider>
)

Tabs.defaultProps = {
  hoverColor: null,
  activeColor: null,
  color: null
}

export default Tabs
