import React, { Fragment } from 'react'

import FontIcon from '../FontIcon'

import { withArrayContext } from './context'

import { ItemHeaderContainer, ItemHeaderContent, ItemActions } from './ArrayInput.style'
import ItemProps from './Item.interface'

const ItemHeader: React.StatelessComponent<ItemProps> = ({
  context: {
    editing,
    canBeReordered,
    onDelete,
    onClose,
    onReorder,
    onOpen,
    amount,
    disabled,
    itemTitleComponent: ItemTitleComponent
  },
  item,
  index
}) => {
  const isOpen = editing === index

  return (
    <ItemHeaderContainer>
      <ItemHeaderContent>
        {
          ItemTitleComponent &&
          <ItemTitleComponent value={item} index={index} editing={isOpen} />
        }
      </ItemHeaderContent>
      {
        !disabled && (
          <React.Fragment>
            <ItemActions>
              {
                canBeReordered && (
                  <Fragment>
                    <FontIcon
                      icon='arrow_upward'
                      onClick={() => onReorder(index, index - 1)}
                      data-disabled={index === 0}
                    />
                    <FontIcon
                      icon='arrow_downward'
                      onClick={() => onReorder(index, index + 1)}
                      data-disabled={index === amount - 1}
                    />
                  </Fragment>
                )
              }
              { isOpen && (
                <Fragment>
                  <FontIcon icon='delete' onClick={() => onDelete(index)} />
                  <FontIcon icon='close' onClick={() => onClose(index)} />
                </Fragment>
              ) }
              { !isOpen && <FontIcon icon='edit' onClick={() => onOpen(index)} /> }
            </ItemActions>
          </React.Fragment>
        )
      }
    </ItemHeaderContainer>
  )
}

export default withArrayContext(ItemHeader)
