import { action } from '@storybook/addon-actions'
import { withKnobs, boolean, select } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'
import * as React from 'react'
import styled from 'styled-components'

import Button from '../Button'
import FontIcon from '../FontIcon'

import { longText, regularText } from './Drawer.data'
import Drawer from './index'

const Content = styled.div`
  width: 80vw;
`

const props = () => ({
  open: boolean('Open', true),
  onClose: action('onClose'),
  position: select('Position', ['right', 'left', 'top', 'bottom']),
})

storiesOf('Layouts|Drawer', module)
  .addDecorator(withKnobs)
  .add('basic example', () => (
    <Drawer {...props()}>
      <Content>{regularText}</Content>
    </Drawer>
  ))
  .add('with title', () => (
    <Drawer {...props()} title="Concerning Hobbits">
      <Content>{longText}</Content>
    </Drawer>
  ))
  .add('with close button', () => (
    <Drawer {...props()} closeButton={<FontIcon icon="arrow_back" />}>
      <Content>{longText}</Content>
    </Drawer>
  ))
  .add('full example', () => (
    <Drawer
      {...props()}
      title="Concerning Hobbits"
      closeButton={<FontIcon icon="arrow_back" />}
    >
      <Content>{longText}</Content>
    </Drawer>
  ))
  .add('with render props', () => (
    <Drawer
      {...props()}
      title="Concerning Hobbits"
      closeButton={<FontIcon icon="arrow_back" />}
    >
      {({ state }) => <Content>{`Current state : ${state}`}</Content>}
    </Drawer>
  ))
  .add('with trigger element', () => (
    <Drawer
      triggerElement={<Button>Open drawer</Button>}
      title="Concerning Hobbits"
      closeButton={<FontIcon icon="arrow_back" />}
    >
      <Content>{longText}</Content>
    </Drawer>
  ))
