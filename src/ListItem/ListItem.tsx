import * as React from 'react'

import useMergedContext from '../_internal/useMergedContext'
import ListContext from '../List/List.context'

import ListItemProps from './ListItem.interface'
import { ListItemContainer, RightElementContainer } from './ListItem.style'

const ListItem: React.FunctionComponent<ListItemProps> = rawProps => {
  const {
    children,
    selected,
    rightElement,
    clickable,
    ...props
  } = useMergedContext(ListContext, rawProps)

  return (
    <ListItemContainer
      tabIndex={clickable ? 0 : undefined}
      data-selected={selected}
      data-clickable={clickable}
      {...props}
    >
      <div>{children}</div>
      {rightElement && (
        <RightElementContainer>{rightElement}</RightElementContainer>
      )}
    </ListItemContainer>
  )
}

export default ListItem
