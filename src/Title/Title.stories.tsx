import * as React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs, text, boolean, select } from '@storybook/addon-knobs'

import Title from './index'

import colors from '../colors'

const sizes = { 'Title 1': 1, 'Title 2': 2, 'Title 3': 3, 'Title 4': 4 }

const props = () => ({
  children: text('Content', 'This is a title'),
  size: select('Size', sizes, 1),
  color: select('Color', colors, colors.maastrichtBlue),
  underline: boolean('Underline', false)
})

storiesOf('Typography/Title', module)
  .addDecorator(withKnobs)
  .add('full example', () => <Title {...props()} />)
