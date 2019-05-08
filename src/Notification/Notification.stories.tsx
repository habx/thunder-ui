import { storiesOf } from '@storybook/react'
import * as React from 'react'

import Notification from './index'

storiesOf('Miscellaneous|Notification', module)
  .add('basic', () => (
    <Notification>{'Short notification message'}</Notification>
  ))
  .add('warning', () => (
    <Notification warning>{'Short warning message'}</Notification>
  ))
  .add('error', () => (
    <Notification error>{'Short error message'}</Notification>
  ))
  .add('multiline', () => (
    <Notification>
      {
        'This book is largely concerned with Hobbits, and from its pages a reader may discover much of their character and a little of their history.'
      }
    </Notification>
  ))
