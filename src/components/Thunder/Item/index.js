import { withThunderContext, withSectionContext } from '../context'
import withItemBehavior from './withItemBehavior'

import Item from './Item'

export default withThunderContext(withSectionContext(withItemBehavior(Item)))
