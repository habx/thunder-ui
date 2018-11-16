import { configure, addDecorator } from '@storybook/react'
import centered from '@storybook/addon-centered'
import fontDecorator from './fontDecorator'

addDecorator(centered)
addDecorator(fontDecorator)

const req = require.context('../src/components', true, /\.stories\.js$/)

function loadStories() {
  req.keys().forEach(filename => req(filename))
}

configure(loadStories, module)
