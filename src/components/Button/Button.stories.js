import React from 'react'
import { storiesOf } from '@storybook/react'

import { colors } from '../../theme'

import Button from './index'

storiesOf('Button', module)
  .add('with manual color', () => <Button color={colors.trueBlue}>Click on me !</Button>)
  .add('disabled', () => <Button disabled>{'Don\'t click one me !'}</Button>)
  .add('warning', () => <Button warning>Click on me !</Button>)
  .add('small', () => <Button small>Click on me !</Button>)
