import * as React from 'react'

export const Context = React.createContext({})

export const withContext = <Props extends object>(
  Component: React.ComponentType<Props>
) => {
  const WrappedComponent = (props: Props) => (
    <Context.Consumer>
      {context => <Component {...context} {...props} />}
    </Context.Consumer>
  )

  WrappedComponent.displayName = Component.displayName || Component.name

  WrappedComponent.defaultProps = Component.defaultProps

  WrappedComponent.propTypes = Component.propTypes

  return WrappedComponent
}
