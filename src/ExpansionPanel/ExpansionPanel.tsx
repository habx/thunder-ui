import * as React from 'react'

import { ExpansionPanelContext } from './ExpansionPanel.context'
import ExpansionPanelProps from './ExpansionPanel.interface'
import { ExpansionPanelContainer } from './ExpansionPanel.style'

const ExpansionPanel: React.StatelessComponent<ExpansionPanelProps> = ({
  children,
  flat,
  multiOpen,
  ...rest
}) => {
  const [openedItems, setOpenedItems] = React.useState([])

  const contextValue = React.useMemo(
    () => ({
      openedItems,
      setOpenedItems,
      multiOpen,
    }),
    [multiOpen, openedItems]
  )

  return (
    <ExpansionPanelContext.Provider value={contextValue}>
      <ExpansionPanelContainer data-flat={flat} {...rest}>
        {children}
      </ExpansionPanelContainer>
    </ExpansionPanelContext.Provider>
  )
}

export default ExpansionPanel
