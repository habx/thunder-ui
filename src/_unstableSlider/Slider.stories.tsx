import { action } from '@storybook/addon-actions'
import { storiesOf } from '@storybook/react'
import * as React from 'react'
import { withState } from 'recompose'
import styled from 'styled-components'

import Slider from './Slider'

const Container = styled.div`
  min-width: 300px;
`

const enhance = withState('value', 'onChange', 0)

const sliderDecorator = storyFn => <Container>{storyFn()}</Container>

storiesOf('Inputs|Slider unstable', module)
  .addDecorator(sliderDecorator)
  .add('basic', () => <Slider onChange={action('Slider change')} value={40} />)
  .add('disabled', () => (
    <Slider disabled onChange={action('Slider change')} value={40} />
  ))
  .add('error', () => (
    <Slider error onChange={action('Slider change')} value={40} />
  ))
  .add('with range', () => (
    <Slider range onChange={action('Slider change')} value={[20, 60]} />
  ))
  .add('with tooltip suffix', () => (
    <Slider toolTipSuffix="m²" onChange={action('Slider change')} value={3} />
  ))
  .add('with custom values', () => {
    const EnhancedSlider = enhance(({ value, onChange }) => (
      <Slider
        customValues={[
          'Cabane',
          'Studio',
          'Appartement',
          'Loft',
          'Maison',
          'Manoir',
          'Chateau',
        ]}
        value={value}
        onChange={val => {
          action('Slider change')
          onChange(val)
        }}
      />
    ))

    return <EnhancedSlider />
  })
