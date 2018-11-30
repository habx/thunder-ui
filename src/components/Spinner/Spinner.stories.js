import React from 'react'
import { storiesOf } from '@storybook/react'
import Spinner from './index'


storiesOf('Miscellaneous/Spinner', module)
  .add('Basic', () => (
    <Spinner />
  ))
  .add('Custom size', () => (
    <Spinner size={20} />
  ))
  .add('Custom color', () => (
    <Spinner color='red' />
  ))
