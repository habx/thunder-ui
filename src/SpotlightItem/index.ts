import * as React from 'react'

import Item from './SpotlightItem'
import withItemBehavior from './withItemBehavior'

export default withItemBehavior(React.memo(Item))
