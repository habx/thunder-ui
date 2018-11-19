import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs, text } from '@storybook/addon-knobs'

import Tag from './index'

storiesOf('Tag', module)
  .addDecorator(withKnobs)
  .add('with manual color', () => <Tag color="#ff5100">groslay</Tag>)
  .add('with generated color', () => (
    <Tag colorSeed={text('Seed pour générer la couleur', 'groslay')}>groslay</Tag>
  ))
