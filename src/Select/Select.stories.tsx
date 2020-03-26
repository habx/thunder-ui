import { action } from '@storybook/addon-actions'
import { storiesOf } from '@storybook/react'
import * as React from 'react'
import { withState } from 'recompose'
import styled from 'styled-components'

import FontIcon from '../FontIcon'

import Select from './index'
import { longData, shortData } from './Select.data'

const BottomContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  height: 90vh;
`

const SelectWithState = ({ value = null, ...props }) => {
  const Component = withState('value', 'onChange', value)(newProps => (
    <Select
      options={shortData}
      placeholder="Options"
      {...newProps}
      onChange={newValue => {
        action('onChange')(newValue)
        newProps.onChange(newValue)
      }}
    />
  ))

  return <Component {...props} />
}

storiesOf('Inputs|Select', module)
  .add('simple', () => <SelectWithState />)
  .add('filterable', () => <SelectWithState filterable options={longData} />)
  .add('compact', () => <SelectWithState compact options={longData} />)
  .add('disabled', () => <SelectWithState disabled />)
  .add('error', () => <SelectWithState error />)
  .add('with description', () => (
    <SelectWithState
      description="Please pick an option"
      annotation="The one you prefer"
    />
  ))
  .add('with icon', () => (
    <SelectWithState icon={<FontIcon icon="camera_enhance" />} />
  ))
  .add('without reset', () => <SelectWithState canReset={false} />)
  .add('multi items', () => <SelectWithState multi />)
  .add('multi items with select all', () => (
    <SelectWithState multi canSelectAll />
  ))
  .add('with disabled options', () => (
    <SelectWithState
      optionDisabled={(option: { value: number }) => option.value > 1}
    />
  ))
  .add('adapt when no space', () => (
    <BottomContainer>
      <SelectWithState compact options={longData} />
    </BottomContainer>
  ))
