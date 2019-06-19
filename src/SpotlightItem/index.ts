import * as React from 'react'

import SpotlightItem from './SpotlightItem'
import withItemBehavior from './withItemBehavior'

export { default as SpotlightItemProps } from './SpotlightItem.interface'

export default withItemBehavior(React.memo(SpotlightItem))
