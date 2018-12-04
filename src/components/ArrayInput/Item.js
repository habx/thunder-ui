import React from 'react'
import PropTypes from 'prop-types'

import ItemHeader from './ItemHeader'

import { withArrayContext } from './context'
import { ItemContainer, ItemContent, ItemDescription } from './style'


const Item = ({
  context: { editing, itemComponent: ItemComponent, itemDescription },
  index,
  item,
}) => {
  const isEditing = editing === index

  return (
    <ItemContainer>
      <ItemHeader item={item} index={index} />
      {
        isEditing && (
          <ItemContent>
            <ItemComponent value={item} index={index} />
          </ItemContent>
        )
      }
      {
        !isEditing && itemDescription && (
          <ItemDescription>
            {itemDescription(item, index)}
          </ItemDescription>
        )
      }
    </ItemContainer>
  )
}

Item.propTypes = {
  index: PropTypes.number.isRequired,
  item: PropTypes.any.isRequired, // eslint-disable-line react/forbid-prop-types
}
export default withArrayContext(Item)
