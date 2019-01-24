import * as React from 'react'
import { storiesOf } from '@storybook/react'

import colors from '../colors'

import TextButton from './index'

storiesOf('Actions/TextButton', module)
  .add('with manual color', () => <TextButton color={colors.maastrichtBlue}>Click on me !</TextButton>)
  .add('disabled', () => <TextButton disabled>{'Don\'t click one me !'}</TextButton>)
  .add('warning', () => <TextButton warning>Click on me !</TextButton>)
  .add('error', () => <TextButton error>Click on me !</TextButton>)
