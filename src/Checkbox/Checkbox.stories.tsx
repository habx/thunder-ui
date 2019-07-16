import { withKnobs, boolean } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'
import * as React from 'react'
import styled from 'styled-components'

import Title from '../Title'

import Checkbox from './index'

const StoryContainer = styled.div`
  margin: 64px;
`

const LineContainer = styled.div`
  padding: 12px 48px 36px 48px;
`

const CheckboxList = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 8px -8px -8px -8px;
  & > button {
    margin: 8px;
  }
`

const CheckboxContainer = styled.div`
  width: 300px;
  display: flex;
  align-items: center;
  padding-right: 24px;
`

const Label = props => <label {...props}>Check</label>

const CheckboxWithLabel = props => {
  const id = React.useRef(Math.random)

  return (
    <React.Fragment>
      <Checkbox {...props} id={id.current} />
      <Label htmlFor={id.current}>Exemple de label</Label>
    </React.Fragment>
  )
}

const createLine = (title, props = {}) => {
  const content = (
    <LineContainer>
      <Title size={3}>{title}</Title>
      <CheckboxList>
        <CheckboxContainer>
          <CheckboxWithLabel />
        </CheckboxContainer>
        <CheckboxContainer>
          <CheckboxWithLabel value onChange={() => {}} {...props} />
        </CheckboxContainer>
        <CheckboxContainer>
          <CheckboxWithLabel error value onChange={() => {}} {...props} />
        </CheckboxContainer>
        <CheckboxContainer>
          <CheckboxWithLabel disabled {...props} />
        </CheckboxContainer>
      </CheckboxList>
    </LineContainer>
  )

  return content
}

storiesOf('Inputs|Checkbox', module)
  .addDecorator(withKnobs)
  .add('gallery', () => (
    <StoryContainer>
      {createLine('Regular', {})}
      {createLine('Regular', {})}
    </StoryContainer>
  ))
  .add('dynamic', () => (
    <CheckboxContainer>
      <CheckboxWithLabel
        value={boolean('Value', true)}
        placeholder="votre numéro"
        error={boolean('Error', false)}
        disabled={boolean('Disabled', false)}
      />
    </CheckboxContainer>
  ))
