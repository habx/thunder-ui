import * as React from 'react'
import { withTheme } from 'styled-components'

import { isFunction } from '../_internal/data'
import { styledTheme } from '../_internal/types'
import { ExpansionPanelContext } from '../ExpansionPanel/ExpansionPanel.context'
import FontIcon from '../FontIcon'
import theme from '../theme'
import Title from '../Title'

import ExpansionPanelItemProps, {
  ExpansionPanelItemInnerProps,
} from './ExpansionPanelItem.interface'
import {
  ExpansionPanelItemContainer,
  TitleBar,
  CoreContainer,
  CoreContent,
} from './ExpansionPanelItem.style'

const ExpansionPanelItem: React.StatelessComponent<
  ExpansionPanelItemInnerProps
> = ({
  children,
  title,
  expandIcon,
  collapseIcon,
  open,
  header,
  onToggle,
  ...props
}) => {
  const { openedItems, setOpenedItems, multiOpen } = React.useContext(
    ExpansionPanelContext
  )
  const itemRef = React.useRef(Math.random())
  const contentRef = React.useRef(null)
  const [contentHeight, setItemHeight] = React.useState(0)

  // eslint-disable-next-line react-hooks/exhaustive-deps
  React.useLayoutEffect(() => {
    if (contentRef.current) {
      const height = contentRef.current.scrollHeight
      setItemHeight(height)
    }
  })

  const handleToggleLocally = React.useCallback(() => {
    if (multiOpen) {
      const newOpenedItems = openedItems.includes(itemRef.current)
        ? [...openedItems].filter(i => i !== itemRef.current)
        : [...openedItems, itemRef.current]
      setOpenedItems(newOpenedItems)
    } else {
      setOpenedItems(
        openedItems.includes(itemRef.current) ? [] : [itemRef.current]
      )
    }
  }, [openedItems, setOpenedItems, multiOpen])
  const handleToggle = onToggle || handleToggleLocally

  const isOpened =
    open !== undefined ? open : openedItems.includes(itemRef.current)
  const color = theme.get('neutralStronger', { dynamic: true })(props)

  return (
    <ExpansionPanelItemContainer {...props}>
      <TitleBar onClick={handleToggle}>
        {header}
        {!header && (
          <React.Fragment>
            {title && (
              <Title size={3} color={color}>
                {title}
              </Title>
            )}
            {!isOpened &&
              (expandIcon || <FontIcon icon="expand_more" color={color} />)}
            {isOpened &&
              (collapseIcon || <FontIcon icon="expand_less" color={color} />)}
          </React.Fragment>
        )}
      </TitleBar>
      <CoreContainer
        data-open={isOpened}
        ref={contentRef}
        height={contentHeight}
      >
        <CoreContent>
          {isFunction(children) ? children({ open }) : children}
        </CoreContent>
      </CoreContainer>
    </ExpansionPanelItemContainer>
  )
}

ExpansionPanelItem.defaultProps = {
  theme: {} as styledTheme,
}

export default withTheme(ExpansionPanelItem) as React.StatelessComponent<
  ExpansionPanelItemProps
>
