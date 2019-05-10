import { action } from '@storybook/addon-actions'
import { withKnobs, select, boolean, text } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'
import * as React from 'react'

import { regularText } from './Card.data'
import Card from './index'

const HEADER_POSITIONS = {
  Inside: 'inside',
  Outside: 'outside',
}

const ACTIONS = {
  With: 'Here comes the action',
  Without: null,
}

const props = () => ({
  title: text('Title', 'Concerning Hobbits'),
  subtitle: text('Subtitle', 'Chapter 1'),
  titleCount: text('Title count', undefined),
  headerPosition: select('Position of the header', HEADER_POSITIONS, 'inside'),
  action: select('Action', ACTIONS, ACTIONS.Without),
  interactive: boolean('Interactive', false),
  error: boolean('Error', false),
  onClick: action('onClick'),
})

storiesOf('Layouts|Card', module)
  .addDecorator(withKnobs)
  .add('full example', () => <Card {...props()}>{regularText}</Card>)
  .add('error', () => (
    <Card error title="Concerning Hobbits" subtitle="Chapter 1">
      {regularText}
    </Card>
  ))
  .add('interactive', () => (
    <Card interactive title="Concerning Hobbits" subtitle="Chapter 1">
      {regularText}
    </Card>
  ))
  .add('title count', () => (
    <Card titleCount="5" title="Concerning Hobbits" subtitle="Chapter 1">
      {regularText}
    </Card>
  ))
