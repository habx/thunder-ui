import * as React from 'react'

import ExpansionPanelProps from './ExpansionPanel.interface'
import { ExpansionPanelContainer } from './ExpansionPanel.style'
import { ExpansionPanelContext } from './ExpansionPanel.context'

const ExpansionPanel: React.StatelessComponent<ExpansionPanelProps> = ({ children, flat, ...rest }) => {
  const [openedItem, setOpenedItem] = React.useState(-1)

  const contextValue = React.useMemo(() => ({
    openedItem,
    setOpenedItem
  }), [openedItem, setOpenedItem])

  return (
    <ExpansionPanelContext.Provider value={contextValue}>
      <ExpansionPanelContainer data-flat={flat} {...rest}>
        { children }
      </ExpansionPanelContainer>
    </ExpansionPanelContext.Provider>
  )
}

export default ExpansionPanel
