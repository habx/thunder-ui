import React, { createContext } from 'react'

export const ArrayContext = createContext({})

export const withArrayContext = Component => props => (
  <ArrayContext.Consumer>
    {context => <Component {...props} context={context} />}
  </ArrayContext.Consumer>
)
