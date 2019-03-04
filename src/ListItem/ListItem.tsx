import * as React from 'react'
import { withTheme } from 'styled-components'

import ListItemProps from './ListItem.interface'
import { ListItemContainer, RightElementContainer } from './style'

const ListItem: React.StatelessComponent<ListItemProps> = ({ children, selected, rightElement, ...props }) => (
  <ListItemContainer data-selected={selected} {...props}>
    <div>
      {children}
    </div>
    {rightElement && <RightElementContainer>
      {rightElement}
    </RightElementContainer>}
  </ListItemContainer>
)

export default withTheme(ListItem)
