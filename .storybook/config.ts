import { configure, addDecorator } from '@storybook/react'
import { withInfo } from '@storybook/addon-info'
import centered from '@storybook/addon-centered'

import fontDecorator from './fontDecorator'

addDecorator(withInfo)
addDecorator(centered)
addDecorator(fontDecorator)

const req = process.env.NODE_ENV === 'test' ?
  require('./requireContext')('../src', true, /\.stories\.(tsx)$/) :
  require.context('../src/', true, /\.stories\.(tsx)$/)

function loadStories () {
  req.keys().forEach(filename => req(filename))
}

configure(loadStories, module)
