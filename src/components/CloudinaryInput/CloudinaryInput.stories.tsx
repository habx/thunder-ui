import * as React from 'react'
import styled from 'styled-components'
import { storiesOf } from '@storybook/react'

import CloudinaryInput from './index'

const Container = styled.div`
  max-width: 500px;
`

const containerDecorator = storyFn => (
  <Container>
    {storyFn()}
  </Container>
)

storiesOf('Inputs/CloudinaryInput', module)
  .addDecorator(containerDecorator)
