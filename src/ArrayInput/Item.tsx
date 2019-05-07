import React, { Fragment } from 'react'

import { isFunction } from '../_internal/data'
import ExpansionPanelItem from '../ExpansionPanelItem'
import FontIcon from '../FontIcon'

import {
  ItemHeaderContainer,
  ItemHeaderContent,
  ItemActions,
} from './ArrayInput.style'
import ItemProps from './Item.interface'

const Item: React.StatelessComponent<ItemProps> = ({
  item,
  index,
  canBeReordered,
  disabled,
  onReorder,
  onDelete,
  onClick,
  open,
  renderItem,
  renderItemTitle,
}) => {
  const handleDelete = e => {
    e.stopPropagation()

    if (isFunction(onDelete)) {
      onDelete(index)
    }
  }

  const handleMoveUp = e => {
    e.stopPropagation()

    if (isFunction(onReorder) && index > 0) {
      onReorder(index, index - 1)
    }
  }

  const state = { index, value: item, editing: open }

  const header = (
    <ItemHeaderContainer onClick={onClick}>
      <ItemHeaderContent>
        {isFunction(renderItemTitle) && renderItemTitle(state)}
      </ItemHeaderContent>
      <ItemActions>
        {!disabled && canBeReordered && (
          <Fragment>
            <FontIcon
              icon="arrow_upward"
              onClick={handleMoveUp}
              data-disabled={index === 0}
              size={18}
            />
          </Fragment>
        )}
        {!disabled && (
          <FontIcon icon="delete" onClick={handleDelete} size={18} />
        )}
        <FontIcon icon={open ? 'expand_less' : 'expand_more'} />
      </ItemActions>
    </ItemHeaderContainer>
  )

  return (
    <ExpansionPanelItem header={header} open={open}>
      {isFunction(renderItem) && renderItem(state)}
    </ExpansionPanelItem>
  )
}

export default Item
