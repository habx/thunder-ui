import { get as lodashGet } from 'lodash'

import colors from '../colors'

export const DEFAULT_THEME = {
  background: colors.white,
  border: colors.whiteSmoke,
  text: colors.paynesGrey,

  section: {
    title: colors.paynesGrey
  },

  item: {
    title: colors.maastrichtBlue,
    subtitle: colors.maastrichtBlue,
    focus: colors.snow,
    actionIcon: colors.paynesGrey,
    icon: colors.whiteSmoke,
    iconBackground: colors.trueBlue,
    highlight: colors.oldLace,
    subtitleFont: 'Inter UI'
  },

  welcome: {
    background: colors.trueBlue,
    color: colors.whiteSmoke
  }
}

export const get = path => ({ theme }) => lodashGet(theme, `_spotlight.${path}`)
