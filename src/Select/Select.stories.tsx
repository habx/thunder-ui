import * as React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { withState } from 'recompose'

import FontIcon from '../FontIcon'
import Select from './index'
import { longData, shortData } from './Select.data'

const SelectWithState = ({ value = null, ...props }) => {
  const Component = withState('value', 'onChange', value)(newProps => (
    <Select
      options={shortData}
      placeholder='Options'
      {...newProps}
      onChange={(...args) => {
        action('onChange')(...args)
        newProps.onChange(...args)
      }}
    />
  ))

  return <Component {...props} />
}

storiesOf('Inputs/Select', module)
  .add('simple', () => (
    <SelectWithState />
  ))
  .add('filterable', () => (
    <SelectWithState filterable options={longData} />
  ))
  .add('compact', () => (
    <SelectWithState compact options={longData} />
  ))
  .add('disabled', () => (
    <SelectWithState disabled />
  ))
  .add('error', () => (
    <SelectWithState error />
  ))
  .add('with description', () => (
    <SelectWithState description='Please pick an option' annotation='The one you prefer' />
  ))
  .add('with icon', () => (
    <SelectWithState icon={<FontIcon icon='camera_enhance' />} />
  ))
  .add('without reset', () => (
    <SelectWithState canReset={false} />
  ))
  .add('multi items', () => (
    <SelectWithState multi />
  ))
