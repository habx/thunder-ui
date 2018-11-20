import React from 'react'
import { storiesOf } from '@storybook/react'

import Notification from './index'

storiesOf('Notification', module)
  .add('basic', () => <Notification>{'Impossible de modifier l\'email'}</Notification>)
  .add('warning', () => <Notification warning>{'Impossible de modifier l\'email'}</Notification>)
  .add('error', () => <Notification error>{'Impossible de modifier l\'email'}</Notification>)
  .add('with illustration', () => (
    <Notification
      illustration={
        <span
          role='img'
          aria-label='Icone de la notification'
          style={{ fontSize: '50px' }}
        >
          🎉
        </span>
      }
    >
      {'Impossible de modifier l\'email'}
    </Notification>
  ))
