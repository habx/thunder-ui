import * as React from 'react'

import Title from '../Title'
import FontIcon from '../FontIcon'

import ExpansionPanelItemProps from './ExpansionPanelItem.interface'
import { ExpansionPanelItemContainer, TitleBar, CoreContainer, CoreContent } from './ExpansionPanelItem.style'
import { ExpansionPanelContext } from '../ExpansionPanel/ExpansionPanel.context'

const useContentHeight = (children) => {
  const contentRef = React.useRef(null)
  const [contentHeight, setItemHeight] = React.useState(0)

  React.useLayoutEffect(
    () => {
      if (contentRef.current) {
        const height = contentRef.current.scrollHeight
        setItemHeight(height)
      }
    },
    [children, contentRef.current]
  )

  return [contentRef, contentHeight]
}

const ExpansionPanelItem: React.StatelessComponent<ExpansionPanelItemProps> = ({ children, title, expandIcon, collapseIcon }) => {
  const { openedItem, setOpenedItem } = React.useContext(ExpansionPanelContext)
  const [itemId] = React.useState(Math.random())
  const [contentRef, contentHeight] = useContentHeight(children)

  const onToggle = React.useMemo(
    () => () => setOpenedItem(openedItem === itemId ? null : itemId),
    [openedItem, setOpenedItem, itemId]
  )

  const isOpened = openedItem === itemId

  return (
    <ExpansionPanelItemContainer>
      <TitleBar onClick={onToggle}>
        <Title size={3}>{ title }</Title>
        {
          !isOpened && (
            expandIcon || <FontIcon icon='expand_more' />
          )
        }
        {
          isOpened && (
            collapseIcon || <FontIcon icon='expand_less' />
          )
        }
      </TitleBar>
      <CoreContainer
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

export default ExpansionPanelItem
