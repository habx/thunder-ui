import { withKnobs, boolean } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'
import * as React from 'react'

import colors from '../colors'
import FontIcon from '../FontIcon'

import IconButton from './index'

const props = () => ({
  disabled: boolean('Disabled', false),
  small: boolean('Small', false),
  large: boolean('Large', false),
  error: boolean('Error', false),
  warning: boolean('Warning', false),
})

storiesOf('Actions|IconButton', module)
  .addDecorator(withKnobs)
  .add('full example', () => {
    const storyProps = props()
    return (
      <IconButton {...storyProps}>
        <FontIcon
          icon="delete"
          color="white"
          size={storyProps.small ? 16 : storyProps.large ? 32 : 24}
        />
      </IconButton>
    )
  })
  .add('disabled', () => (
    <IconButton disabled>
      <FontIcon icon="delete" color="white" />
    </IconButton>
  ))
  .add('small', () => (
    <IconButton small>
      <FontIcon icon="delete" color="white" size={16} />
    </IconButton>
  ))
  .add('large', () => (
    <IconButton large>
      <FontIcon icon="delete" color="white" size={32} />
    </IconButton>
  ))
  .add('error', () => (
    <IconButton error>
      <FontIcon icon="delete" color="white" />
    </IconButton>
  ))
  .add('warning', () => (
    <IconButton warning>
      <FontIcon icon="delete" color="white" />
    </IconButton>
  ))
  .add('with manual color', () => (
    <IconButton color={colors.maastrichtBlue}>
      <FontIcon icon="delete" color="white" />
    </IconButton>
  ))
