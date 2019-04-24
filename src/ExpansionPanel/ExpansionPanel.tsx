import * as React from 'react'

import ExpansionPanelProps from './ExpansionPanel.interface'
import { ExpansionPanelContainer } from './ExpansionPanel.style'
import { ExpansionPanelContext } from './ExpansionPanel.context'

const ExpansionPanel: React.StatelessComponent<ExpansionPanelProps> = ({ children, flat, multiOpen, ...rest }) => {
  const [openedItems, setOpenedItems] = React.useState([])

  const contextValue = React.useMemo(() => ({
    openedItems,
    setOpenedItems,
    multiOpen
  }), [openedItems, setOpenedItems])

  return (
    <ExpansionPanelContext.Provider value={contextValue}>
      <ExpansionPanelContainer data-flat={flat} {...rest}>
        { children }
      </ExpansionPanelContainer>
    </ExpansionPanelContext.Provider>
  )
}

export default ExpansionPanel
