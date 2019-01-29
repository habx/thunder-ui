import * as React from 'react'
import styled from 'styled-components'
import { storiesOf } from '@storybook/react'
import { withState } from 'recompose'

import TextInput from '.'
import FontIcon from '../FontIcon'

const HABX_ADDRESS = '55 Rue d\'Amsterdam, 75008 Paris'

const Container = styled.div`
  width: 300px;
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
  .add('error', () => <TextInputWithState error value={HABX_ADDRESS} />)
  .add('small', () => <TextInputWithState small value={HABX_ADDRESS}/>)
  .add('placeholder', () => <TextInputWithState value='' placeholder='Type something here' />)
  .add('with loader', () => <TextInputWithState loading value={HABX_ADDRESS} />)
  .add('with icon', () => <TextInputWithState value={HABX_ADDRESS} rightElement={<FontIcon icon='edit' size={18} />} />)
  .add('with hover icon', () => <TextInputWithState value={HABX_ADDRESS} rightHoverElement={<FontIcon icon='edit' size={18} />} />)
