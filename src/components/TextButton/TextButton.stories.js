import React from 'react'
import { storiesOf } from '@storybook/react'

import { colors } from '../../theme'

import TextButton from './index'

storiesOf('TextButton', module)
  .add('with manual color', () => <TextButton color={colors.trueBlue}>Click on me !</TextButton>)
  .add('disabled', () => <TextButton disabled>{'Don\'t click one me !'}</TextButton>)
  .add('warning', () => <TextButton warning>Click on me !</TextButton>)
