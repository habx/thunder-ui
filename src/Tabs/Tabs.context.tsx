import * as React from 'react'

import { TabsContextProps } from './Tabs.interface'

const DEFAULT_CONTEXT = {
  isInsideATabs: false,
}

const TabsContext = React.createContext<TabsContextProps>(DEFAULT_CONTEXT)

export default TabsContext
