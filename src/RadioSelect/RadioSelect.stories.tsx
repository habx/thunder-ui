import { storiesOf } from '@storybook/react'
import * as React from 'react'
import { withState } from 'recompose'

import colors from '../colors'

import RadioSelect from './RadioSelect'
import { simpleOptions, cardinalPoints, manyOptions } from './RadioSelect.data'

const RadioSelectWithState = ({ value, ...props }) => {
  const Component = withState('value', 'onChange', value)(newProps => (
    <RadioSelect {...newProps} />
  ))

  return <Component {...props} />
}

storiesOf('Inputs|RadioSelect', module)
  .add('basic', () => (
    <RadioSelectWithState value={1} options={simpleOptions} />
  ))
  .add('disabled', () => (
    <RadioSelectWithState value={1} options={simpleOptions} disabled />
  ))
  .add('error', () => (
    <RadioSelectWithState value={1} options={simpleOptions} error />
  ))
  .add('with custom color', () => (
    <RadioSelectWithState
      value={1}
      options={simpleOptions}
      color={colors.maastrichtBlue}
    />
  ))
  .add("can't be empty", () => (
    <RadioSelectWithState
      value={1}
      options={simpleOptions}
      canBeEmpty={false}
    />
  ))
  .add('with many option', () => (
    <RadioSelectWithState value={4} options={manyOptions} />
  ))
  .add('with multi selection', () => (
    <RadioSelectWithState
      value={['E', 'W', 'S']}
      options={cardinalPoints}
      multi
    />
  ))
