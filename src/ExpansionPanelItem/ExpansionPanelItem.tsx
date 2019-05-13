import * as React from 'react'
import { withTheme } from 'styled-components'

import { isFunction, isNil } from '../_internal/data'
import { styledTheme } from '../_internal/types'
import { assert } from '../_internal/validityCheck'
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
  ExpansionPanelItemContent,
  CoreContent,
} from './ExpansionPanelItem.style'

const ExpansionPanelItem: React.FunctionComponent<
  ExpansionPanelItemInnerProps
> = ({
  children,
  title,
  expandIcon,
  collapseIcon,
  open: rawOpen,
  header,
  onToggle,
  ...props
}) => {
  const isControlled = !isNil(rawOpen)

  const {
    openedItems,
    setOpenedItems,
    multiOpen,
    isInsideAnExpansionPanel,
  } = React.useContext(ExpansionPanelContext)

  assert(
    isInsideAnExpansionPanel,
    'ExpansionPanelItem should be used inside an ExpansionPanel'
  )

  const itemRef = React.useRef(Math.random())
  const contentRef = React.useRef(null)
  const [contentHeight, setItemHeight] = React.useState(0)

  const open = isControlled ? rawOpen : openedItems.includes(itemRef.current)

  // eslint-disable-next-line react-hooks/exhaustive-deps
  React.useLayoutEffect(() => {
    if (contentRef.current) {
      const height = contentRef.current.scrollHeight

      if (height !== contentHeight) {
        setItemHeight(height)
      }
    }
  })

  const handleToggle = React.useCallback(
    e => {
      if (!isControlled) {
        if (multiOpen) {
          setOpenedItems(prev =>
            prev.includes(itemRef.current)
              ? prev.filter(i => i !== itemRef.current)
              : [...prev, itemRef.current]
          )
        } else {
          setOpenedItems(prev =>
            prev.includes(itemRef.current) ? [] : [itemRef.current]
          )
        }
      }

      if (isFunction(onToggle)) {
        onToggle(e)
      }
    },
    [isControlled, onToggle, multiOpen, setOpenedItems]
  )
  const color = theme.get('neutralStronger', { dynamic: true })(props)

  return (
    <ExpansionPanelItemContainer data-testid="expansion-panel-item" {...props}>
      <TitleBar
        data-testid="expansion-panel-item-title-bar"
        onClick={handleToggle}
      >
        {header}
        {!header && (
          <React.Fragment>
            {title && (
              <Title size={3} color={color}>
                {title}
              </Title>
            )}
            {!open &&
              (expandIcon || <FontIcon icon="expand_more" color={color} />)}
            {open &&
              (collapseIcon || <FontIcon icon="expand_less" color={color} />)}
          </React.Fragment>
        )}
      </TitleBar>
      <ExpansionPanelItemContent
        data-testid="expansion-panel-item-content"
        data-open={open}
        ref={contentRef}
        height={contentHeight}
      >
        <CoreContent>
          {isFunction(children) ? children({ open }) : children}
        </CoreContent>
      </ExpansionPanelItemContent>
    </ExpansionPanelItemContainer>
  )
}

ExpansionPanelItem.defaultProps = {
  theme: {} as styledTheme,
}

export default withTheme(ExpansionPanelItem) as React.FunctionComponent<
  ExpansionPanelItemProps
>
