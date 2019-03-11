import * as React from 'react'
import { withTheme } from 'styled-components'

import { withContext } from '../List/context'
import ListItemProps from './ListItem.interface'
import { ListItemContainer, RightElementContainer } from './ListItem.style'

const BaseListItem: React.StatelessComponent<ListItemProps> = ({ children, selected, rightElement, ...props }) => {
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

const ListItem: React.StatelessComponent<ListItemProps> = withContext(withTheme(BaseListItem))

export default ListItem
