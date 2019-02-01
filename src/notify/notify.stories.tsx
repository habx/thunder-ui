import * as React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import notify from '.'

import HabxProvider from '../../HabxProvider'
import Button from '../../Button'

const habxProvider = storyFn => (
  <HabxProvider>
    { storyFn() }
  </HabxProvider>
)

storiesOf('Events/notify', module)
  .addDecorator(habxProvider)
  .add('basic', () => (
    <Button onClick={() => notify('This is a notification')}>
      Trigger event
    </Button>
  ))
  .add('error', () => (
    <Button onClick={() => notify('This is a notification', { type: 'error' })}>
      Trigger event
    </Button>
  ))
  .add('warning', () => (
    <Button onClick={() => notify('This is a notification', { type: 'warning' })}>
      Trigger event
    </Button>
  ))

  .add('with custom duration', () => (
    <Button onClick={() => notify('This is a notification', { duration: 1000 })}>
      Trigger event
    </Button>
  ))
  .add('without auto close', () => (
    <Button onClick={() => notify('This is a notification', { duration: 0 })}>
      Trigger event
    </Button>
  ))
