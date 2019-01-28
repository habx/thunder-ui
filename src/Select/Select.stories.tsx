import * as React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { withState } from 'recompose'

import FontIcon from '../FontIcon'
import Select from './index'
import { shortData } from './Select.data'

const DEFAULT_VALUE_FULL = shortData[2]
const DEFAULT_VALUE_SIMPLE = shortData[2].value

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
    <SelectWithState filterable />
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
  .add('single item with value (label, value mode)', () => (
    <SelectWithState value={DEFAULT_VALUE_FULL} />
  ))
  .add('single item with value (simple value mode)', () => (
    <SelectWithState value={DEFAULT_VALUE_SIMPLE} />
  ))
  .add('single item without reset', () => (
    <SelectWithState canReset={false} />
  ))
  .add('multi items', () => (
    <SelectWithState isMulti />
  ))
  .add('multi items with value (label, value mode)', () => (
    <SelectWithState isMulti value={[DEFAULT_VALUE_FULL]} />
  ))
  .add('multi items with value (simple value mode)', () => (
    <SelectWithState isMulti value={[DEFAULT_VALUE_SIMPLE]} />
  ))
  .add('multi items with icon', () => (
    <SelectWithState isMulti icon={<FontIcon icon='camera_enhance' />} />
  ))
