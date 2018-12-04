import React from 'react'
import PropTypes from 'prop-types'

import ItemHeader from './ItemHeader'

import { withArrayContext } from './context'
import { ItemContainer, ItemContent } from './style'


const Item = ({ context: { editing, itemComponent: ItemComponent }, index, item }) => (
  <ItemContainer>
    <ItemHeader item={item} index={index} />
    {
      editing === index && (
        <ItemContent>
          <ItemComponent value={item} index={index} />
        </ItemContent>
      )
    }
  </ItemContainer>
)

Item.propTypes = {
  index: PropTypes.number.isRequired,
  item: PropTypes.any.isRequired, // eslint-disable-line react/forbid-prop-types
}
export default withArrayContext(Item)
