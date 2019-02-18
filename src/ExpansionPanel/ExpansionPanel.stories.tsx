import * as React from 'react'
import styled from 'styled-components'
import { storiesOf } from '@storybook/react'

import ExpansionPanel from './index'
import ExpansionPanelItem from '../ExpansionPanelItem'
import { regularData } from './ExpansionPanel.data'

const Container = styled.div`
  width: 500px;
`

const navDecorator = storyFn => (
  <Container>
    {storyFn()}
  </Container>
)

storiesOf('Layouts/ExpansionPanel', module)
  .addDecorator(navDecorator)
  .add('basic uncontrolled', () => (
    <ExpansionPanel>
      <ExpansionPanelItem title='First item'>
        { regularData }
      </ExpansionPanelItem>
      <ExpansionPanelItem title='Second item'>
        { regularData }
      </ExpansionPanelItem>
      <ExpansionPanelItem title='Third item'>
        { regularData }
      </ExpansionPanelItem>
      <ExpansionPanelItem title='Fourth item'>
        { regularData }
      </ExpansionPanelItem>
    </ExpansionPanel>
  ))
