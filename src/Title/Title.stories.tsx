import { withKnobs, text, boolean, select } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'
import * as React from 'react'

import Title from './index'
import TitleProps from './Title.interface'

const sizes = { 'Title 1': 1, 'Title 2': 2, 'Title 3': 3, 'Title 4': 4 }

const props = () =>
  ({
    children: text('Content', 'This is a title'),
    size: select('Size', sizes, 1),
    underline: boolean('Underline', false),
    error: boolean('Error', false),
    warning: boolean('Warning', false),
  } as TitleProps)

storiesOf('Typography|Title', module)
  .addDecorator(withKnobs)
  .add('full example', () => <Title {...props()} />)
