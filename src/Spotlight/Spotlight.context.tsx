import * as React from 'react'

import { spotlightContext } from '../_internal/types'

const SpotlightContext = React.createContext({} as spotlightContext)

export default SpotlightContext

export const withSpotlightContext = Component => props => (
  <SpotlightContext.Consumer>
    {context => <Component {...props} spotlight={context} />}
  </SpotlightContext.Consumer>
)
