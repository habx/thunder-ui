import { configure, addDecorator, addParameters } from '@storybook/react'
import { withInfo } from '@storybook/addon-info'
import centered from '@storybook/addon-centered'
import { create } from '@storybook/theming'

import theme from '../src/theme'

import providerDecorator from './providerDecorator'

const thunderTheme = theme.dark

addDecorator(withInfo)
addDecorator(centered)
addDecorator(providerDecorator(thunderTheme.name as 'light' | 'dark'))

const storyBookDarkTheme = create({
  base: thunderTheme.name === 'dark' ? 'dark' : 'light',

  colorPrimary: thunderTheme.primary,
  colorSecondary: 'deepskyblue',

  // UI
  appBg: thunderTheme.neutralLightest,
  appContentBg: thunderTheme.neutralLighter,

  // Text colors
  textColor: thunderTheme.neutral,

  // Toolbar default and active colors
  barTextColor: thunderTheme.neutral,
  barSelectedColor: thunderTheme.neutralStronger,
  barBg: thunderTheme.neutralLightest,

  brandTitle: 'Habx Thunder UI'
})

addParameters({
  options: {
    sortStoriesByKind: true,
    theme: storyBookDarkTheme
  }
})

const req = process.env.NODE_ENV === 'test' ?
  require('./requireContext')('../src', true, /\.stories\.(tsx)$/) :
  require.context('../src/', true, /\.stories\.(tsx)$/)

function loadStories () {
  req.keys().forEach(filename => req(filename))
}

configure(loadStories, module)
