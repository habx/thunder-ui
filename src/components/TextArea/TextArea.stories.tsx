import * as React from 'react'
import styled from 'styled-components'
import { storiesOf } from '@storybook/react'
import { withState } from 'recompose'

import TextArea from './index'

const HABX_ADDRESS = '55 Rue d\'Amsterdam, 75008 Paris'

const Container = styled.div`
  width: 250px;
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
