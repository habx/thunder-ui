import * as React from 'react'

export const SpotlightContext = React.createContext({})

export const SectionContext = React.createContext({})

export const withSpotlightContext = Component => props => (
  <SpotlightContext.Consumer>
    {context => <Component {...props} spotlight={context} />}
  </SpotlightContext.Consumer>
)

export const withSectionContext = Component => props => (
  <SectionContext.Consumer>
    {context => <Component {...props} section={context} />}
  </SectionContext.Consumer>
)
