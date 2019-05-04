import { storiesOf } from '@storybook/react'
import * as React from 'react'

import colors from '../colors'

import Spinner from './index'

storiesOf('Miscellaneous|Spinner', module)
  .add('Basic', () => <Spinner />)
  .add('Custom size', () => <Spinner size={20} />)
  .add('Custom color', () => <Spinner color={colors.brightCerualean} />)
