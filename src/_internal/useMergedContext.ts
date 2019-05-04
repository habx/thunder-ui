import * as React from 'react'

const useMergedContext = (Context, props) => {
  const contextProps = React.useContext(Context)

  return { ...contextProps, ...props }
}

export default useMergedContext
