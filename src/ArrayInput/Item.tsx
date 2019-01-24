import * as React from 'react'

import ItemHeader from './ItemHeader'

import { withArrayContext } from './context'
import { ItemContainer, ItemContent, ItemDescription } from './ArrayInput.style'
import ItemProps from './Item.interface'

const Item: React.StatelessComponent<ItemProps> = ({
  context: {
    editing,
    itemComponent: ItemComponent,
    itemDescriptionComponent: ItemDescriptionComponent
  },
  index,
  item
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
        !isEditing && ItemDescriptionComponent && (
          <ItemDescription>
            {<ItemDescriptionComponent item={item} index={index} />}
          </ItemDescription>
        )
      }
    </ItemContainer>
  )
}

export default withArrayContext(Item)
