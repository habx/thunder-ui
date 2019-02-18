import * as React from 'react'

import { ExpansionPanelContextType } from './ExpansionPanel.interface'

export const ExpansionPanelContext = React.createContext<ExpansionPanelContextType>({
  openedItem: null,
  setOpenedItem: () => null
})
