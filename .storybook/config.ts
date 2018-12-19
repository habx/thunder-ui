import { configure, addDecorator } from '@storybook/react'
import centered from '@storybook/addon-centered'
import { withInfo } from '@storybook/addon-info'
import fontDecorator from './fontDecorator'

addDecorator(centered)
addDecorator(fontDecorator)
addDecorator(withInfo)

const req = process.env.NODE_ENV === 'test' ?
  require('./requireContext')('../src/components', true, /\.stories\.(tsx)$/) :
  require.context('../src/components', true, /\.stories\.(tsx)$/)

function loadStories() {
  req.keys().forEach(filename => req(filename))
}

configure(loadStories, module)
