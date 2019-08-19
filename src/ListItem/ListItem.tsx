import * as React from 'react'

import useMergedContext from '../_internal/useMergedContext'
import ListContext from '../List/List.context'

import ListItemProps from './ListItem.interface'
import { ListItemContainer, RightElementContainer } from './ListItem.style'

const ListItem = React.forwardRef<HTMLLIElement, ListItemProps>(
  (props, ref) => {
    const {
      children,
      selected,
      rightElement,
      clickable,
      ...rest
    } = useMergedContext(ListContext, props)

    return (
      <ListItemContainer
        tabIndex={clickable ? 0 : undefined}
        data-selected={selected}
        data-clickable={clickable}
        {...rest}
        ref={ref}
      >
        <div>{children}</div>
        {rightElement && (
          <RightElementContainer>{rightElement}</RightElementContainer>
        )}
      </ListItemContainer>
    )
  }
)

export default ListItem
