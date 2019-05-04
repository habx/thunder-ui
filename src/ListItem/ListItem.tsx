import * as React from 'react'

import { Context } from '../List/context'
import ListItemProps from './ListItem.interface'
import { ListItemContainer, RightElementContainer } from './ListItem.style'
import useMergedContext from '../_internal/useMergedContext'

const ListItem: React.StatelessComponent<ListItemProps> = rawProps => {
  const { children, selected, rightElement, ...props } = useMergedContext(Context, rawProps)

  return (
    <ListItemContainer data-selected={selected} {...props}>
      <div>
        {children}
      </div>
      {rightElement && <RightElementContainer>
        {rightElement}
      </RightElementContainer>}
    </ListItemContainer>
  )
}

export default ListItem
