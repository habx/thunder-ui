import * as React from 'react'

export const SpotlightSectionContext = React.createContext({})

export const withSpotlightSectionContext = Component => props => (
  <SpotlightSectionContext.Consumer>
    {context => <Component {...props} section={context} />}
  </SpotlightSectionContext.Consumer>
)
