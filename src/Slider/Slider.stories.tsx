import * as React from 'react'
import styled from 'styled-components'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { withState } from 'recompose'

import Slider from './Slider'
import colors from '../colors'

const Container = styled.div`
  min-width: 300px;
`

const enhance = withState('value', 'onChange', 0)

const sliderDecorator = storyFn => (
  <Container>
    {storyFn()}
  </Container>
)

storiesOf('Inputs/Slider', module)
  .addDecorator(sliderDecorator)
  .add('Basic', () => (
    <Slider onChange={action('Slider change')} value={40} />
  ))
  .add('with range', () => (
    <Slider range onChange={action('Slider change')} value={[20, 60]} />
  ))
  .add('with tooltip suffix', () => (
    <Slider
      toolTipSuffix='m²'
      onChange={action('Slider change')}
      value={3}
    />
  ))
  .add('with custom values', () => {
    const EnhancedSlider = enhance(({ value, onChange }) => (
      <Slider
        customValues={['Cabane', 'Studio', 'Appartement', 'Loft', 'Maison', 'Manoir', 'Chateau']}
        value={value}
        onChange={val => {
          action('Slider change')
          onChange(val)
        }}
      />
    ))

    return <EnhancedSlider />
  })
  .add('with custom color', () => (
    <Slider onChange={action('Slider change')} value={40} color={colors.trueBlue} />
  ))
