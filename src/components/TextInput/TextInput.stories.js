import React from 'react'
import styled from 'styled-components'
import { storiesOf } from '@storybook/react'
import { withState } from 'recompose'

import TextInput from './index'

const HABX_ADDRESS = '55 Rue d\'Amsterdam, 75008 Paris'

const Container = styled.div`
  width: 250px;
`

const TextInputWithState = ({ value = '', ...props }) => {
  const Component = withState('value', 'onChange', value)(newProps => (
    <TextInput {...newProps} />
  ))

  return (
    <Container>
      <Component {...props} />
    </Container>
  )
}


storiesOf('Inputs/TextInput', module)
  .add('basic', () => <TextInputWithState value={HABX_ADDRESS} />)
  .add('disabled', () => <TextInputWithState disabled value={HABX_ADDRESS} />)
  .add('with label', () => <TextInputWithState label={'Adresse d\'Habx'} value={HABX_ADDRESS} />)
  .add('with error', () => <TextInputWithState error value={HABX_ADDRESS} />)
