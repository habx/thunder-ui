import * as React from 'react'

import BaseItem from './SpotlightItem'
import ItemProps from './SpotlightItem.interface'
import withItemBehavior from './withItemBehavior'

const Item: React.StatelessComponent<ItemProps> = withItemBehavior(BaseItem)

export default Item
