import * as React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs, text } from '@storybook/addon-knobs'

import Tag from '.'

storiesOf('Miscellaneous/Tag', module)
  .addDecorator(withKnobs)
  .add('with manual color', () => <Tag color='#f9e38f'>groslay</Tag>)
  .add('bold', () => <Tag color='#f9e38f' bold>groslay</Tag>)
  .add('with generated color', () => (
    <Tag colorSeed={text('Seed pour générer la couleur', 'groslay')}>groslay</Tag>
  ))
