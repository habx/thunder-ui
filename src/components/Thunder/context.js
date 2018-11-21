import React from 'react'

export const ThunderContext = React.createContext({})

export const SectionContext = React.createContext({})

export const withThunderContext = Component => props => (
  <ThunderContext.Consumer>
    {context => <Component {...props} thunder={context} />}
  </ThunderContext.Consumer>
)

export const withSectionContext = Component => props => (
  <SectionContext.Consumer>
    {context => <Component {...props} section={context} />}
  </SectionContext.Consumer>
)
