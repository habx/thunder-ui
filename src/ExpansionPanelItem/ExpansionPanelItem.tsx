import * as React from 'react'
import { withTheme } from 'styled-components'

import Title from '../Title'
import FontIcon from '../FontIcon'
import { getMainColor } from '../_internal/colors'

import ExpansionPanelItemProps from './ExpansionPanelItem.interface'
import { ExpansionPanelItemContainer, TitleBar, CoreContainer, CoreContent } from './ExpansionPanelItem.style'
import { ExpansionPanelContext } from '../ExpansionPanel/ExpansionPanel.context'

const BaseExpansionPanelItem: React.StatelessComponent<ExpansionPanelItemProps> = ({ children, title, expandIcon, collapseIcon, ...props }) => {
  const { openedItem, setOpenedItem } = React.useContext(ExpansionPanelContext)
  const [itemId] = React.useState(Math.random())
  const contentRef = React.useRef(null)
  const [contentHeight, setItemHeight] = React.useState(0)

  React.useLayoutEffect(() => {
    if (contentRef.current) {
      const height = contentRef.current.scrollHeight
      setItemHeight(height)
    }
  })

  const onToggle = React.useCallback(
    () => setOpenedItem(openedItem === itemId ? null : itemId),
    [openedItem, setOpenedItem, itemId]
  )

  const isOpened = openedItem === itemId
  const color = getMainColor(props, { themeKey: 'neutralStronger' })

  return (
    <ExpansionPanelItemContainer>
      <TitleBar onClick={onToggle}>
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

const ExpansionPanelItem = withTheme(BaseExpansionPanelItem)

export default ExpansionPanelItem
