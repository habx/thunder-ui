import * as React from 'react'
import { storiesOf } from '@storybook/react'

import colors from '../colors'

import Button from '.'

storiesOf('Actions/Button', module)
  .add('with manual background color', () => <Button backgroundColor={colors.trueBlue}>Click on me !</Button>)
  .add('disabled', () => <Button disabled>{'Don\'t click one me !'}</Button>)
  .add('warning', () => <Button warning>Click on me !</Button>)
  .add('small', () => <Button small>Click on me !</Button>)
  .add('loading', () => <Button isLoading>Click on me !</Button>)
  .add('loading small', () => <Button small isLoading>Click on me !</Button>)
