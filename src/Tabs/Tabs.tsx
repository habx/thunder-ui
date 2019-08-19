import * as React from 'react'

import TabsContext from './Tabs.context'
import TabsProps from './Tabs.interface'
import { TabsContainer } from './Tabs.style'

const Tabs = React.forwardRef<HTMLUListElement, TabsProps>((props, ref) => {
  const { color, hoverColor, activeColor, children, ...rest } = props

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
      <TabsContainer {...rest} ref={ref}>
        {children}
      </TabsContainer>
    </TabsContext.Provider>
  )
})

export default Tabs
