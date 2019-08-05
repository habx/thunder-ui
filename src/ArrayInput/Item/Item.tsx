import React, { Fragment } from 'react'

import { isFunction } from '../../_internal/data'
import ExpansionPanelItem from '../../ExpansionPanelItem'
import FontIcon from '../../FontIcon'
import {
  ItemHeaderContainer,
  ItemHeaderContent,
  ItemActions,
} from '../ArrayInput.style'

import ItemProps from './Item.interface'

const Item: React.FunctionComponent<ItemProps> = ({
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
  ...rest
}) => {
  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation()

    if (isFunction(onDelete)) {
      onDelete(index)
    }
  }

  const handleMoveUp = (e: React.MouseEvent) => {
    e.stopPropagation()

    if (isFunction(onReorder) && index > 0) {
      onReorder(index, index - 1)
    }
  }

  const state = { index, value: item, editing: open }

  const header = (
    <ItemHeaderContainer
      onClick={onClick}
      data-testid="array-input-item-header"
    >
      <ItemHeaderContent>
        {isFunction(renderItemTitle) && renderItemTitle(state)}
      </ItemHeaderContent>
      <ItemActions>
        {!disabled && canBeReordered && (
          <Fragment>
            <FontIcon
              data-disabled={index === 0}
              data-testid="array-input-item-mode-up"
              icon="arrow_upward"
              onClick={handleMoveUp}
              size={18}
            />
          </Fragment>
        )}
        {!disabled && (
          <FontIcon
            icon="delete"
            onClick={handleDelete}
            size={18}
            data-testid="array-input-item-delete"
          />
        )}
        <FontIcon icon={open ? 'expand_less' : 'expand_more'} />
      </ItemActions>
    </ItemHeaderContainer>
  )

  return (
    <ExpansionPanelItem
      header={header}
      open={open}
      data-testid="array-input-item"
      {...rest}
    >
      {isFunction(renderItem) && renderItem(state)}
    </ExpansionPanelItem>
  )
}

export default Item
