import * as React from 'react'
import styled from 'styled-components'
import { storiesOf } from '@storybook/react'
import { withState } from 'recompose'
import { withKnobs, boolean, select } from '@storybook/addon-knobs'
import { action } from '@storybook/addon-actions'

import Drawer from './index'
import { longText, regularText } from './Drawer.data'
import FontIcon from '../FontIcon'

const Content = styled.div`
  width: 80vw;
`

const props = () => ({
  open: boolean('Open', true),
  onClose: action('onClose'),
  position: select('Position', ['right', 'left', 'top', 'bottom'])
})

const DrawerWithState = props => {
  const Component = withState('open', 'onClose', true)(({ onClose, ...newProps }) => (
    <Drawer {...newProps} onClose={() => onClose(false)}/>
  ))

  return <Component {...props} />
}

storiesOf('Layouts/Drawer', module)
  .addDecorator(withKnobs)
  .add('basic example', () => (
    <Drawer {...props()}>
      <Content>
        {regularText}
      </Content>
    </Drawer>
  ))
  .add('with title', () => (
    <DrawerWithState {...props()} title='Concerning Hobbits'>
      <Content>
        {longText}
      </Content>
    </DrawerWithState>
  ))
  .add('with close button', () => (
    <DrawerWithState {...props()} closeButton={<FontIcon icon='arrow_back'/>}>
      <Content>
        {longText}
      </Content>
    </DrawerWithState>
  ))
  .add('full example', () => (
    <DrawerWithState {...props()} title='Concerning Hobbits' closeButton={<FontIcon icon='arrow_back'/>}>
      <Content>
        {longText}
      </Content>
    </DrawerWithState>
  ))
