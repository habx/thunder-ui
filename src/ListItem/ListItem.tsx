import * as React from 'react'

import useMergedContext from '../_internal/useMergedContext'
import { Context } from '../List/context'

import ListItemProps from './ListItem.interface'
import { ListItemContainer, RightElementContainer } from './ListItem.style'

const ListItem: React.FunctionComponent<ListItemProps> = rawProps => {
  const { children, selected, rightElement, ...props } = useMergedContext(
    Context,
    rawProps
  )

  return (
    <ListItemContainer data-selected={selected} {...props}>
      <div>{children}</div>
      {rightElement && (
        <RightElementContainer>{rightElement}</RightElementContainer>
      )}
    </ListItemContainer>
  )
}

export default ListItem
