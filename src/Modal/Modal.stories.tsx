import * as React from 'react'
import styled from 'styled-components'
import { storiesOf } from '@storybook/react'
import { withState } from 'recompose'
import { withKnobs, boolean } from '@storybook/addon-knobs'
import { action } from '@storybook/addon-actions'

import Modal from './index'
import Button from '../Button'
import { longText, regularText } from './Modal.data'
import withTriggerElement from '../withTriggerElement'
import FontIcon from '../FontIcon'

const TriggeredModal = withTriggerElement(Modal)

const Container = styled.div`
  line-height: 1.5;
`

const props = () => ({
  open: boolean('Open', true),
  onClose: action('onClose')
})

storiesOf('Layouts/Drawer', module)
  .addDecorator(withKnobs)
  .add('full example', () => (
    <Modal {...props()} title='Concerning Hobbits' subtitle='Chapter 1' closeButton={<FontIcon icon='close'/>}>
      {longText}
    </Modal>
  ))
  .add('small', () => (
    <Modal {...props()}>
      <Container>
        This is a simple modal
      </Container>
    </Modal>
  ))
  .add('large', () => (
    <Modal {...props()}>
      <Container>
        {regularText}
      </Container>
    </Modal>
  ))
  .add('with scroll', () => (
    <Modal {...props()}>
      <Container>
        {longText}
      </Container>
    </Modal>
  ))
  .add('with close button', () => (
    <Modal {...props()} closeButton={<FontIcon icon='close'/>}>
      <Container>
        {longText}
      </Container>
    </Modal>
  ))
  .add('with title', () => (
    <Modal {...props()} title='Concerning Hobbits'>
      <Container>
        {regularText}
      </Container>
    </Modal>
  ))
  .add('with render props', () => (
    <Modal {...props()}>
      {({ state }) => (
        <Container>
          {`Current state : ${state}`}
        </Container>
      )}
    </Modal>
  ))
  .add('with trigger element HOC', () => (
    <TriggeredModal triggerElement={<Button>Open modal</Button>}>
      {longText}
    </TriggeredModal>
  ))
