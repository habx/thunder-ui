import * as React from 'react'

import { ItemContainer, ItemContent, ItemDescription } from './ArrayInput.style'
import { withArrayContext } from './context'
import ItemProps from './Item.interface'
import ItemHeader from './ItemHeader'

const Item: React.StatelessComponent<ItemProps> = ({
  context: {
    editing,
    itemComponent: ItemComponent,
    itemDescriptionComponent: ItemDescriptionComponent,
  },
  index,
  item,
}) => {
  const isEditing = editing === index

  return (
    <ItemContainer>
      <ItemHeader item={item} index={index} />
      {isEditing && (
        <ItemContent>
          <ItemComponent value={item} index={index} />
        </ItemContent>
      )}
      {!isEditing && ItemDescriptionComponent && (
        <ItemDescription>
          {<ItemDescriptionComponent value={item} index={index} />}
        </ItemDescription>
      )}
    </ItemContainer>
  )
}

export default withArrayContext(Item)
