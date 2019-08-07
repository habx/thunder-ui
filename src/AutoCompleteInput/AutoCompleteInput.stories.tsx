import { storiesOf } from '@storybook/react'
import * as React from 'react'
import { withState } from 'recompose'
import styled from 'styled-components'

import AutoCompleteInput from './AutoCompleteInput'
import DATA from './AutoCompleteInput.data'

const Container = styled.div`
  width: 300px;
`

const AutoCompleteInputWithState = ({ value = '', ...props }) => {
  const Component = withState('value', 'onChange', value)(
    (newProps: { value: string; onChange: Function }) => (
      <AutoCompleteInput
        {...newProps}
        onChange={value => newProps.onChange(value)}
      />
    )
  )

  return (
    <Container>
      <Component {...props} />
    </Container>
  )
}

storiesOf('Inputs|AutoCompleteInput', module).add('basic', () => (
  <AutoCompleteInputWithState
    value=""
    options={DATA}
    placeholder="French cities"
  />
))
