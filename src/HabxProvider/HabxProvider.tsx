import * as React from 'react'

import ConfirmModals from '../confirm/ConfirmModals'
import NotificationList from '../notify/NotificationList'

class HabxProvider extends React.Component<any> {
  render () {
    return (
      <React.Fragment>
        { this.props.children }
        <ConfirmModals />
        <NotificationList />
      </React.Fragment>
    )
  }
}

export default HabxProvider
