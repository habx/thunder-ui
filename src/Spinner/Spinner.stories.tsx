import * as React from 'react'
import { storiesOf } from '@storybook/react'

import Spinner from '.'
import colors from '../../colors'

storiesOf('Miscellaneous/Spinner', module)
  .add('Basic', () => (
    <Spinner />
  ))
  .add('Custom size', () => (
    <Spinner size={20} />
  ))
  .add('Custom color', () => (
    <Spinner color={colors.brightCerualean} />
  ))
