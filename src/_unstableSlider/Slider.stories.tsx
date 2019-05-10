import { action } from '@storybook/addon-actions'
import { storiesOf } from '@storybook/react'
import * as React from 'react'
import styled from 'styled-components'

import Slider from './Slider'

const Container = styled.div`
  min-width: 300px;
`

const sliderDecorator = storyFn => <Container>{storyFn()}</Container>

storiesOf('Inputs|Slider unstable', module)
  .addDecorator(sliderDecorator)
  .add('basic', () => <Slider onChange={action('Slider change')} value={40} />)
