import { configure, addDecorator, addParameters } from '@storybook/react'
import { withInfo } from '@storybook/addon-info'
import centered from '@storybook/addon-centered'

import providerDecorator from './providerDecorator'
import '!!style-loader!css-loader?url=false!../src/reset.css'

addDecorator(withInfo)
addDecorator(centered)
addDecorator(providerDecorator)

addParameters({
  options: {
    sortStoriesByKind: true
  }
})

const req = process.env.NODE_ENV === 'test' ?
  require('./requireContext')('../src', true, /\.stories\.(tsx)$/) :
  require.context('../src/', true, /\.stories\.(tsx)$/)

function loadStories () {
  req.keys().forEach(filename => req(filename))
}

configure(loadStories, module)
