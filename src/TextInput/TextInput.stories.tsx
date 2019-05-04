import { storiesOf } from '@storybook/react'
import * as React from 'react'
import { withState } from 'recompose'
import styled from 'styled-components'

import FontIcon from '../FontIcon'

import TextInput from '.'

const CONTENT = 'Hello world'

const Container = styled.div`
  width: 300px;
`

const TextInputWithState = ({ value = '', ...props }) => {
  const Component = withState('value', 'onChange', value)(newProps => (
    <TextInput {...newProps} onChange={value => newProps.onChange(value)} />
  ))

  return (
    <Container>
      <Component {...props} />
    </Container>
  )
}

storiesOf('Inputs|TextInput', module)
  .add('basic', () => <TextInputWithState value={CONTENT} />)
  .add('disabled', () => <TextInputWithState disabled value={CONTENT} />)
  .add('error', () => <TextInputWithState error value={CONTENT} />)
  .add('small', () => <TextInputWithState small value={CONTENT} />)
  .add('placeholder', () => (
    <TextInputWithState value="" placeholder="Type something here" />
  ))
  .add('with loader', () => <TextInputWithState loading value={CONTENT} />)
  .add('with icon', () => (
    <TextInputWithState
      value={CONTENT}
      rightElement={<FontIcon icon="edit" size={18} />}
    />
  ))
  .add('with hover icon', () => (
    <TextInputWithState
      value={CONTENT}
      rightHoverElement={<FontIcon icon="edit" size={18} />}
    />
  ))
