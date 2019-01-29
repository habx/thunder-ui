import * as React from 'react'
import styled from 'styled-components'
import { storiesOf } from '@storybook/react'
import { withState } from 'recompose'

import TextArea from '.'

const HABX_ADDRESS = '55 Rue d\'Amsterdam, 75008 Paris'

const Container = styled.div`
  width: 350px;
`

const TextAreaWithState = ({ value = '', ...props }) => {
  const Component = withState('value', 'onChange', value)(newProps => (
    <TextArea {...newProps} />
  ))

  return (
    <Container>
      <Component {...props} />
    </Container>
  )
}

storiesOf('Inputs/TextArea', module)
  .add('basic', () => <TextAreaWithState value={HABX_ADDRESS} />)
  .add('disabled', () => <TextAreaWithState disabled value={HABX_ADDRESS} />)
  .add('error', () => <TextAreaWithState error value={HABX_ADDRESS} />)
  .add('placeholder', () => <TextAreaWithState value='' placeholder='Type something here' />)
