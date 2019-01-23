import * as React from 'react'

import ConfirmModals from '../confirm/ConfirmModals'

class HabxProvider extends React.PureComponent<any> {
  render () {
    return (
      <React.Fragment>
        { this.props.children }
        <ConfirmModals />
      </React.Fragment>
    )
  }
}

export default HabxProvider
