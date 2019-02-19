import * as React from 'react'
import styled from 'styled-components'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { withKnobs, select, boolean, text } from '@storybook/addon-knobs'

import Card from './index'
import { regularText } from './Card.data'

const Container = styled.div`
  max-width: 500px;
  line-height: 1.5;
`

const HEADER_POSITIONS = {
  Inside: 'inside',
  Outside: 'outside'
}

const ACTIONS = {
  With: 'Here comes the action',
  Without: null
}

const props = () => ({
  title: text('Title', 'Concerning Hobbits'),
  subtitle: text('Subtitle', 'Chapter 1'),
  titleCount: text('Title count', ''),
  headerPosition: select('Position of the header', HEADER_POSITIONS, 'inside'),
  action: select('Action', ACTIONS, ACTIONS.Without),
  interactive: boolean('Interactive', false),
  error: boolean('Error', false),
  onClick: action('onClick')
})

storiesOf('Layouts/Card', module)
  .addDecorator(withKnobs)
  .add('full example', () => (
    <Card {...props()}>
      <Container>
        {regularText}
      </Container>
    </Card>
  ))
