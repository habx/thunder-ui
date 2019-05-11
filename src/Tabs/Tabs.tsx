import * as React from 'react'
import styled from 'styled-components'

import TabsContext from './Tabs.context'
import TabsProps from './Tabs.interface'

const TabsContainer = styled.ul`
  display: flex;
  list-style-type: none;
  margin: 0;
  padding: 0;
`

const Tabs: React.FunctionComponent<TabsProps> = ({
  color,
  hoverColor,
  activeColor,
  children,
  ...other
}) => {
  const context = React.useMemo(
    () => ({
      hoverColor,
      activeColor,
      color,
      isInsideATabs: true,
    }),
    [activeColor, color, hoverColor]
  )

  return (
    <TabsContext.Provider value={context}>
      <TabsContainer {...other}>{children}</TabsContainer>
    </TabsContext.Provider>
  )
}

export default Tabs
