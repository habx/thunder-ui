import React, { Fragment } from 'react'

import FontIcon from '../FontIcon'

import { withArrayContext } from './context'

import { ItemHeaderContainer, ItemHeaderContent, ItemActions } from './style'
import ItemProps from './Item.interface'

const ItemHeader: React.FunctionComponent<ItemProps> = ({ context, item, index }) => {
  const isOpen = context.editing === index

  return (
    <ItemHeaderContainer>
      <ItemHeaderContent>
        {context.itemTitle && context.itemTitle(item, index)}
      </ItemHeaderContent>
      <ItemActions>
        {
          context.canBeReordered && (
            <Fragment>
              <FontIcon
                icon='arrow_upward'
                onClick={() => context.onReorder(index, index - 1)}
                data-disabled={index === 0}
              />
              <FontIcon
                icon='arrow_downward'
                onClick={() => context.onReorder(index, index + 1)}
                data-disabled={index === context.amount - 1}
              />
            </Fragment>
          )
        }
        { isOpen && (
          <Fragment>
            <FontIcon icon='delete' onClick={() => context.onDelete(index)} />
            <FontIcon icon='close' onClick={() => context.onClose(index)} />
          </Fragment>
        ) }
        { !isOpen && <FontIcon icon='edit' onClick={() => context.onOpen(index)} /> }
      </ItemActions>
    </ItemHeaderContainer>
  )
}

export default withArrayContext(ItemHeader)
