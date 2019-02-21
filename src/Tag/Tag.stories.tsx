import * as React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs, text, select, boolean } from '@storybook/addon-knobs'

import colors from '../colors'

import Tag from './index'

const props = () => ({
  children: text('Content', 'paris'),
  color: select('Color', { ...colors, 'none': undefined}, undefined),
  colorSeed: text('Color seed', '')
})

storiesOf('Miscellaneous/Tag', module)
  .addDecorator(withKnobs)
  .add('full example', () => <Tag {...props()} />)
  .add('with manual color', () => <Tag color='#f9e38f'>paris</Tag>)
  .add('bold', () => <Tag color='#f9e38f' bold>paris</Tag>)
  .add('with generated color', () => <Tag colorSeed='paris'>paris</Tag>)
