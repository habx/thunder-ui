import { withKnobs, boolean } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'
import * as React from 'react'

import { isNil } from '../_internal/data'
import StorybookGallery from '../_internal/StorybookGallery'

import RawRadioSelect from './RadioSelect'
import { booleanOptions, cardinalPoints, manyOptions } from './RadioSelect.data'

const RadioSelect = ({ value = null, options = booleanOptions, ...props }) => {
  const realValue = isNil(value) ? options[0].value : value

  const [localValue, setLocalValue] = React.useState(
    props.multi ? [realValue] : realValue
  )

  return (
    <RawRadioSelect
      {...props}
      options={options}
      onChange={val => setLocalValue(val)}
      value={localValue}
    />
  )
}

storiesOf('Inputs|RadioSelect', module)
  .addDecorator(withKnobs)
  .add('gallery', () => (
    <StorybookGallery
      renderLine={lineProps => (
        <React.Fragment>
          <RadioSelect {...lineProps} />
          <RadioSelect {...lineProps} error />
          <RadioSelect {...lineProps} disabled />
        </React.Fragment>
      )}
      lines={[
        {
          title: 'Boolean',
          props: { options: booleanOptions, canBeEmpty: false },
        },
        {
          title: 'Cardinal points',
          props: { options: cardinalPoints, canBeEmpty: false },
        },
        {
          title: 'Cardinal points (can be empty)',
          props: { options: cardinalPoints },
        },
        {
          title: 'Many options (multi)',
          props: { options: manyOptions, canBeEmpty: false, multi: true },
        },
      ]}
    />
  ))
  .add('dynamic', () => (
    <RadioSelect
      disabled={boolean('Disabled', false)}
      error={boolean('Error', false)}
      canBeEmpty={boolean('Can be empty', false)}
      options={booleanOptions}
    />
  ))
