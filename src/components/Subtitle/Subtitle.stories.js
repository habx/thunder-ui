import React from 'react'
import { storiesOf } from '@storybook/react'

import Subtitle from './index'

import { colors } from '../../theme'

storiesOf('Typography/Subtitle', module)
  .add('with manual color', () => <Subtitle color={colors.trueBlue}>This is a subtitle</Subtitle>)

