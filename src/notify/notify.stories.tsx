import { storiesOf } from '@storybook/react'
import * as React from 'react'

import Button from '../Button'
import ThunderProvider from '../ThunderProvider'

import notify from './index'

const thunderDecorator = (storyFn: Function) => (
  <ThunderProvider>{storyFn()}</ThunderProvider>
)

storiesOf('Events|notify', module)
  .addDecorator(thunderDecorator)
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
    <Button
      onClick={() => notify('This is a notification', { type: 'warning' })}
    >
      Trigger event
    </Button>
  ))

  .add('with custom duration', () => (
    <Button
      onClick={() => notify('This is a notification', { duration: 1000 })}
    >
      Trigger event
    </Button>
  ))
  .add('without auto close', () => (
    <Button onClick={() => notify('This is a notification', { duration: 0 })}>
      Trigger event
    </Button>
  ))
