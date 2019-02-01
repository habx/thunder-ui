import * as React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs, boolean } from '@storybook/addon-knobs'

import colors from '../colors'

import TextButton from './index'

const props = () => ({
  disabled: boolean('Disabled', false),
  small: boolean('Small', false),
  large: boolean('Large', false),
  error: boolean('Error', false),
  warning: boolean('Warning', false)
})

storiesOf('Actions/TextButton', module)
  .addDecorator(withKnobs)
  .add('full example', () => <TextButton {...props()}>Click on me !</TextButton>)
  .add('disabled', () => <TextButton disabled>{'Don\'t click one me !'}</TextButton>)
  .add('small', () => <TextButton small>Click on me !</TextButton>)
  .add('large', () => <TextButton large>Click on me !</TextButton>)
  .add('error', () => <TextButton error>Click on me !</TextButton>)
  .add('warning', () => <TextButton warning>Click on me !</TextButton>)
  .add('with manual color', () => <TextButton color={colors.brightCerualean}>Click on me !</TextButton>)
