import { storiesOf } from '@storybook/react'
import * as React from 'react'
import { withState } from 'recompose'
import styled from 'styled-components'

import { longData } from '../Select/Select.data'
import TextInput from '../TextInput'

import AutoCompleteBox from './AutoCompleteBox'

const Container = styled.div`
  width: 300px;
`

const AutoCompleteBoxWithState = ({ value = '', ...props }) => {
  const Component = withState('value', 'onChange', value)(newProps => (
    <AutoCompleteBox
      {...newProps}
      onChange={value => newProps.onChange(value)}
    />
  ))

  return (
    <Container>
      <Component {...props} />
    </Container>
  )
}

storiesOf('Inputs|AutoCompleteBox', module).add('basic', () => (
  <AutoCompleteBoxWithState input={TextInput} value="test" options={longData} />
))
