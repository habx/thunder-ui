import * as React from 'react'

export const SpotlightContext = React.createContext({})

export const withSpotlightContext = Component => props => (
  <SpotlightContext.Consumer>
    {context => <Component {...props} spotlight={context} />}
  </SpotlightContext.Consumer>
)
