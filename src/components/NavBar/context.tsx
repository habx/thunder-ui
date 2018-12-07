import React, { createContext } from 'react'

export const Context = createContext({})

export const withContext = Component => props => (
  <Context.Consumer>
    {context => <Component {...context} {...props} />}
  </Context.Consumer>
)
