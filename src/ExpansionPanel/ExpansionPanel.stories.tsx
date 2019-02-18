import * as React from 'react'
import styled from 'styled-components'
import { storiesOf } from '@storybook/react'

import ExpansionPanel from './index'

const Container = styled.div`
  width: 500px;
`

const navDecorator = storyFn => (
  <Container>
    {storyFn()}
  </Container>
)

storiesOf('Navigation/NavBar', module)
  .addDecorator(navDecorator)
  .add('basic', () => (
    <ExpansionPanel>
      TEST
    </ExpansionPanel>
  ))
