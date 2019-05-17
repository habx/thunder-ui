import { storiesOf } from '@storybook/react'
import * as React from 'react'
import { withState } from 'recompose'
import styled from 'styled-components'

import AutoCompleteBox from './AutoCompleteBox'
import DATA from './AutoCompleteBox.data'

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
  <AutoCompleteBoxWithState
    value=""
    options={DATA}
    placeholder="French cities"
  />
))
