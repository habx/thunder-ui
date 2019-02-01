import * as React from 'react'

import withItemBehavior from './withItemBehavior'

import BaseItem from './SpotlightItem'

import ItemProps from './SpotlightItem.interface'

const Item: React.StatelessComponent<ItemProps> = withItemBehavior(BaseItem)

export default Item
