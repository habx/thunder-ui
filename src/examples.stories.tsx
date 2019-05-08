import { storiesOf } from '@storybook/react'
import * as React from 'react'
import styled from 'styled-components'

import Button from './Button'
import Card from './Card'
import RadioSelect from './RadioSelect'
import Slider from './Slider'
import TextArea from './TextArea'
import TextInput from './TextInput'
import Title from './Title'

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

storiesOf('Examples', module).add('Form', () => (
  <div>
    <Title underline>Form</Title>
    <Card title="Who are you ?" style={{ marginTop: 32 }}>
      <Container>
        <TextInput label="Your name" value="Bobby" />
        <RadioSelect
          label="Your gender"
          options={[{ value: 1, label: 'Female' }, { value: 0, label: 'Male' }]}
          value={1}
        />
        <Slider label="Your age" value={23} onChange={() => null} />
      </Container>
      <TextArea label="Your description" value="Lorem ipsum" />
      <ButtonContainer>
        <Button>Validate</Button>
      </ButtonContainer>
    </Card>
  </div>
))
