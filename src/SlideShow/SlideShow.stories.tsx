import * as React from 'react'
import styled from 'styled-components'
import { storiesOf } from '@storybook/react'
import { withKnobs, number, boolean } from '@storybook/addon-knobs'

import SlideShow from './SlideShow'
import Card from '../Card'

const Container = styled.div`
  width: 450px;
`

const Slide = styled.div`
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
`

const slideShowDecorator = storyFn => (
  <Container>
    {storyFn()}
  </Container>
)

const props = () => ({
  active: number('Active slide', 0, { range: true, min: 0, max: 3, step: 1 }),
  isNavigationVisible: boolean('Show navigation dots', true)
})

storiesOf('Layouts|SlideShow', module)
  .addDecorator(withKnobs)
  .addDecorator(slideShowDecorator)
  .add('full example', () => (
    <Card>
      <SlideShow {...props()}>
        <Slide>Slide 1</Slide>
        <Slide>Slide 2 </Slide>
        <Slide>Slide 3</Slide>
        <Slide>Slide 4 </Slide>
      </SlideShow>
    </Card>
  ))
