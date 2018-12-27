import * as React from 'react'
import { storiesOf } from '@storybook/react'
import { withState } from 'recompose'

import RadioSelect from './RadioSelect'
import { colors } from '../../theme'

const SIMPLE_OPTIONS = [
  { value: 0, label: 'Aucune' },
  { value: 1, label: '1 place' },
  { value: 2, label: '2 places' }
]

const CARDINAL_POINTS = [
  { value: 'N', label: 'North' },
  { value: 'E', label: 'East' },
  { value: 'S', label: 'South' },
  { value: 'W', label: 'West' }
]

const RadioSelectWithState = ({ value, ...props }) => {
  const Component = withState('value', 'onChange', value)(newProps => (
    <RadioSelect {...newProps} />
  ))

  return <Component {...props} />
}

storiesOf('Inputs/RadioSelect', module)
  .add('basic', () => (
    <RadioSelectWithState
      value={1}
      options={SIMPLE_OPTIONS}
    />
  ))
  .add('with custom color', () => (
    <RadioSelectWithState
      value={1}
      options={SIMPLE_OPTIONS}
      color={colors.trueBlue}
    />
  ))
  .add('without selected item', () => (
    <RadioSelectWithState
      value={1}
      options={SIMPLE_OPTIONS}
    />
  ))
  .add('can\'t be empty', () => (
    <RadioSelectWithState
      value={1}
      options={SIMPLE_OPTIONS}
      canBeEmpty={false}
    />
  ))
  .add('with many option', () => (
    <RadioSelectWithState
      value={4}
      options={[
        { value: 0, label: '0' },
        { value: 1, label: '1' },
        { value: 2, label: '2' },
        { value: 3, label: '3' },
        { value: 4, label: '4' },
        { value: 5, label: '5' }
      ]}
    />
  ))
  .add('with multi selection', () => (
    <RadioSelectWithState
      value={['E', 'W', 'S']}
      options={CARDINAL_POINTS}
      isMulti
    />
  ))
  .add('with multi selection and can\'t be empty', () => (
    <RadioSelectWithState
      value={['E', 'W']}
      options={CARDINAL_POINTS}
      isMulti
      canBeEmpty={false}
    />
  ))
