import * as React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { withState } from 'recompose'

import FontIcon from '../FontIcon'
import Select from './index'
import options from './Select.data'

const DEFAULT_VALUE_FULL = options[2]
const DEFAULT_VALUE_SIMPLE = options[2].value

const SelectWithState = ({ value = null, ...props }) => {
  const Component = withState('value', 'onChange', value)(newProps => (
    <Select
      options={options}
      placeholder='Projet'
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
  .add('single item', () => (
    <SelectWithState />
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
