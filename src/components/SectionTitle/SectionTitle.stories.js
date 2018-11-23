import React from 'react'
import { storiesOf } from '@storybook/react'

import SectionTitle from './index'

import { colors } from '../../theme'

storiesOf('Typography/SectionTitle', module)
  .add('with manual color', () => <SectionTitle color={colors.trueBlue}>This is a section title</SectionTitle>)
  .add('active', () => <SectionTitle active color={colors.trueBlue}>This is a section title</SectionTitle>)

