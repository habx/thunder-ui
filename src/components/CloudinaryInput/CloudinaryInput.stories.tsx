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
  .add('with string URL', () => (
    <CloudinaryInput
      value='https://res.cloudinary.com/habx/image/upload/v1537883351/V1_8.jpg'
    />
  ))
