import * as React from 'react'
import { storiesOf } from '@storybook/react'

import FontIcon from '../FontIcon'
import colors from '../colors'

import IconButton from './index'

storiesOf('Actions/IconButton', module)
  .add('basic', () => (
    <IconButton>
      <FontIcon icon='delete' color='white' />
    </IconButton>
  ))
  .add('with manual color', () => (
    <IconButton disabled color={colors.maastrichtBlue}>
      <FontIcon icon='delete' color='white' />
    </IconButton>
  ))
  .add('disabled', () => (
    <IconButton disabled>
      <FontIcon icon='delete' color='white' />
    </IconButton>
  ))
  .add('small', () => (
    <IconButton small>
      <FontIcon icon='delete' color='white' size={16} />
    </IconButton>
  ))
  .add('large', () => (
    <IconButton large>
      <FontIcon icon='delete' color='white' size={32} />
    </IconButton>
  ))
  .add('error', () => (
    <IconButton error>
      <FontIcon icon='delete' color='white' />
    </IconButton>
  ))
  .add('warning', () => (
    <IconButton warning>
      <FontIcon icon='delete' color='white' />
    </IconButton>
  ))
