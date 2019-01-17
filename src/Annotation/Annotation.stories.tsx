import * as React from 'react'
import { storiesOf } from '@storybook/react'

import Annotation from '.'

import colors from '../colors'

storiesOf('Typography/Annotation', module)
  .add('basic', () => <Annotation>This is an annotation</Annotation>)
  .add('with manual color', () => <Annotation color={colors.trueBlue}>This is an annotation</Annotation>)
