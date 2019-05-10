import { action } from '@storybook/addon-actions'
import { withKnobs, boolean, text } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'
import * as React from 'react'

import colors from '../colors'
import FontIcon from '../FontIcon'

import Button from './index'

const props = () => ({
  children: text('Content', 'Click on me !'),
  disabled: boolean('Disabled', false),
  small: boolean('Small', false),
  large: boolean('Large', false),
  reverse: boolean('Reverse', false),
  loading: boolean('Loading', false),
  error: boolean('Error', false),
  warning: boolean('Warning', false),
  onClick: action('onClick'),
})

storiesOf('Actions|Button', module)
  .addDecorator(withKnobs)
  .add('full example', () => <Button {...props()} />)
  .add('disabled', () => <Button disabled>{"Don't click one me !"}</Button>)
  .add('small', () => <Button small>Click on me !</Button>)
  .add('large', () => <Button large>Click on me !</Button>)
  .add('error', () => <Button error>Click on me !</Button>)
  .add('warning', () => <Button warning>Click on me !</Button>)
  .add('loading', () => <Button loading>Click on me !</Button>)
  .add('reverse', () => <Button reverse>Click on me !</Button>)
  .add('with manual background color', () => (
    <Button color={colors.maastrichtBlue}>Click on me !</Button>
  ))
  .add('with icon on the left', () => (
    <Button iconLeft={<FontIcon size={16} icon="delete" />}>Supprimer</Button>
  ))
  .add('with icon on the right', () => (
    <Button iconRight={<FontIcon size={16} icon="delete" />}>Supprimer</Button>
  ))
