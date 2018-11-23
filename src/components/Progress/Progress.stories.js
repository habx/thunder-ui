import React from 'react'
import { storiesOf } from '@storybook/react'

import { colors } from '../../theme'

import Progress from './index'

storiesOf('Miscellaneous/Progress', module)
  .add('with low progression', () => <Progress progression={20} />)
  .add('with medium progression', () => <Progress progression={50} />)
  .add('with high progression', () => <Progress progression={80} />)
  .add('with manual color', () => <Progress progression={50} color={colors.popstar} />)
