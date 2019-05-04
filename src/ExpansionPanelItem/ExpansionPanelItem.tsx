import * as React from 'react'
import { withTheme } from 'styled-components'

import Title from '../Title'
import FontIcon from '../FontIcon'
import theme from '../theme'

import ExpansionPanelItemProps, { ExpansionPanelItemInnerProps } from './ExpansionPanelItem.interface'
import { ExpansionPanelItemContainer, TitleBar, CoreContainer, CoreContent } from './ExpansionPanelItem.style'
import { ExpansionPanelContext } from '../ExpansionPanel/ExpansionPanel.context'

const ExpansionPanelItem: React.StatelessComponent<ExpansionPanelItemInnerProps> = ({ children, title, expandIcon, collapseIcon, open, onToggle, titleProps, ...props }) => {
  const { openedItems, setOpenedItems, multiOpen } = React.useContext(ExpansionPanelContext)
  const itemRef = React.useRef(Math.random())
  const contentRef = React.useRef(null)
  const [contentHeight, setItemHeight] = React.useState(0)

  React.useLayoutEffect(() => {
    if (contentRef.current) {
      const height = contentRef.current.scrollHeight
      setItemHeight(height)
    }
  })

  const handleToggleLocally = React.useCallback(
    () => {
      if (multiOpen) {
        const newOpenedItems = openedItems.includes(itemRef.current) ? [...openedItems].filter(i => i !== itemRef.current) : [...openedItems, itemRef.current]
        setOpenedItems(newOpenedItems)
      } else {
        setOpenedItems(openedItems.includes(itemRef.current) ? [] : [itemRef.current])
      }
    },
    [openedItems, setOpenedItems, itemRef.current, multiOpen])
  const handleToggle = onToggle || handleToggleLocally

  const isOpened = open !== undefined ? open : openedItems.includes(itemRef.current)
  const color = theme.get('neutralStronger', { dynamic: true })(props)

  return (
    <ExpansionPanelItemContainer>
      <TitleBar onClick={handleToggle} {...titleProps}>
        <Title size={3} color={color}>{ title }</Title>
        {
          !isOpened && (
            expandIcon || <FontIcon icon='expand_more' color={color} />
          )
        }
        {
          isOpened && (
            collapseIcon || <FontIcon icon='expand_less' color={color} />
          )
        }
      </TitleBar>
      <CoreContainer
        {...props}
        data-open={isOpened}
        ref={contentRef}
        height={contentHeight}
      >
        <CoreContent>
          { children }
        </CoreContent>
      </CoreContainer>
    </ExpansionPanelItemContainer>
  )
}

export default withTheme(ExpansionPanelItem) as React.StatelessComponent<ExpansionPanelItemProps>
