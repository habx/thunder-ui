import * as React from 'react'

import withItemBehavior from './withItemBehavior'

import BaseItem from './Item'

import ItemProps from './Item.interface'

const Item: React.StatelessComponent<ItemProps> = withItemBehavior(BaseItem)

export default Item
