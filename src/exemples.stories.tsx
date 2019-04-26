import * as React from 'react'
import { storiesOf } from '@storybook/react'
import styled from 'styled-components'

import Title from './Title'
import Button from './Button'
import RadioSelect from './RadioSelect'
import Slider from './Slider'
import TextInput from './TextInput'
import TextArea from './TextArea'
import Card from './Card'

const Container = styled.div`
  display: grid;
  margin-top: 64px;
  grid-template-columns: repeat(3, 1fr);
    grid-gap: 32px;
`
const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 16px auto;
`

storiesOf('Examples|Basic', module)
  .add('Form', () => (
    <div>
      <Title underline>Form</Title>
      <Card title='Who are you ?' style={{ marginTop: 32 }}>
        <Container>
          <TextInput label='Your name' value='Bobby'/>
          <RadioSelect label='Your gender' options={[{ value: 1, label: 'Female' }, { value: 0, label: 'Male' }]} value={1} />
          <Slider label='Your age' value={23} onChange={() => null}/>
        </Container>
        <TextArea label='Your description' value='Lorem ipsum'/>
        <ButtonContainer>
          <Button>Validate</Button>
        </ButtonContainer>
      </Card>
    </div>
  ))
  .add('Navigation', () => (
    <div>
      <Title underline>Navigation</Title>

    </div>
  ))
