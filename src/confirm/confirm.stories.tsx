import * as React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import confirm from './index'

import ThunderProvider from '../ThunderProvider'
import Button from '../Button'

const thunderDecorator = storyFn => (
  <ThunderProvider>
    { storyFn() }
  </ThunderProvider>
)

storiesOf('Events|confirm', module)
  .addDecorator(thunderDecorator)
  .add('basic', () => (
    <Button
      onClick={async () => {
        const response = await confirm('Voulez-vous continuer')
        action('Confirm Modal response')(response)
      }}>
      Trigger event
    </Button>
  ))
  .add('with custom button texts', () => (
    <Button
      onClick={async () => {
        const response = await confirm('Voulez-vous continuer', { confirmText: 'Oui', cancelText: 'Non' })
        action('Confirm Modal response')(response)
      }}>
      Trigger event
    </Button>
  ))
