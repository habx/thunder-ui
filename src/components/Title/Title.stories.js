import React from 'react'
import { storiesOf } from '@storybook/react'

import Title from './index'

import { colors } from '../../theme'

storiesOf('Typography/Title', module)
  .add('with manual color', () => <Title color={colors.trueBlue}>This is a title</Title>)
  .add('with underline', () => <Title underline>This is a title</Title>)
