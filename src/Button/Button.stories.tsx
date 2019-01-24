import * as React from 'react'
import { storiesOf } from '@storybook/react'

import colors from '../colors'
import FontIcon from '../FontIcon'

import Button from './index'

storiesOf('Actions/Button', module)
  .add('with manual background color', () => <Button backgroundColor={colors.maastrichtBlue}>Click on me !</Button>)
  .add('disabled', () => <Button disabled>{'Don\'t click one me !'}</Button>)
  .add('warning', () => <Button warning>Click on me !</Button>)
  .add('error', () => <Button error>Click on me !</Button>)
  .add('small', () => <Button small>Click on me !</Button>)
  .add('loading', () => <Button loading>Click on me !</Button>)
  .add('loading small', () => <Button small loading>Click on me !</Button>)
  .add('with icon on the left', () => <Button iconLeft={<FontIcon size={16} icon='delete' />}>Supprimer</Button>)
  .add('with icon on the right', () => <Button iconRight={<FontIcon size={16} icon='delete' />}>Supprimer</Button>)
