import color from 'color'

import { isFunction } from '../_internal/data'
import { themeAccessor } from '../_internal/types'
import colors from '../colors'
import shadows from '../shadows'

import ThunderUITheme from './theme.interface'

const BASE_THEME = {
  error: '#cc0000',
  warning: colors.internationalOrange,
}

const LIGHT_THEME: ThunderUITheme = {
  ...BASE_THEME,

  name: 'light',

  primaryLightest: '#f2f7fc',
  primaryLighter: '#e5f0fa',
  primaryLight: colors.brightCerualean,
  primary: colors.trueBlue,
  primaryStrong: '#00316B',
  primaryStronger: '#001c3d', // Maastricht Blue

  neutralLightest: '#fff',
  neutralLighter: '#efeff1',
  neutralLight: '#d8dade',
  neutral: colors.paynesGrey,
  neutralStrong: '#3e4a5c',
  neutralStronger: '#232934',

  shadowLight: shadows.light,
  shadow: shadows.medium,
  shadowStrong: shadows.strong,
}

const DARK_THEME: ThunderUITheme = {
  ...BASE_THEME,

  name: 'dark',

  error: '#ff0033',

  primaryLightest: '#1d0838',
  primaryLighter: '#4A148C',
  primaryLight: '#6A1B9A',
  primary: '#AB47BC',
  primaryStrong: '#E1BEE7',
  primaryStronger: '#EDE7F6',

  neutralLightest: '#13161c',
  neutralLighter: '#263238',
  neutralLight: '#3e4a5c',
  neutral: '#ebecee',
  neutralStrong: '#fff',
  neutralStronger: '#efeff1',

  shadowLight: '0 2px 6px 0 rgba(0, 13, 27, 0.6)',
  shadow: '0 2px 6px 0 rgba(0, 13, 27, 0.7)',
  shadowStrong: '0 3px 9px 0 rgba(0, 13, 27, 0.9)',
}

const getter = (
  themeKey: keyof ThunderUITheme | 'inherit',
  config: { propName?: string; dynamic?: boolean } = {}
): themeAccessor => {
  const { propName = 'color', dynamic = false } = config

  return (props, runtimeConfig = {}) => {
    const { theme = {} as { thunderUI: ThunderUITheme } } = props
    const thunderTheme = theme.thunderUI || LIGHT_THEME

    if (propName && props[propName] && !runtimeConfig.isRecursive) {
      if (isFunction(props[propName])) {
        return (props[propName] as themeAccessor)(props, {
          isRecursive: true,
        })
      }

      return props[propName] as string
    }

    if (dynamic && props.warning) {
      return thunderTheme.warning
    }

    if (dynamic && props.error) {
      return thunderTheme.error
    }

    if (themeKey === 'inherit') {
      return 'inherit'
    }

    return thunderTheme[themeKey]
  }
}

const activeGetter = (
  customColor?: string,
  baseColor?: string,
  config: { reverse?: boolean } = {}
) => {
  const { reverse = false } = config

  if (customColor) {
    return customColor
  }

  if (baseColor) {
    const mixedColor = reverse ? color('#000') : color('#fff')

    return color(baseColor)
      .mix(mixedColor, 0.2)
      .string()
  }

  return LIGHT_THEME.neutral
}

const theme = {
  get: getter,
  getActive: activeGetter,
  light: LIGHT_THEME,
  dark: DARK_THEME,
}

export default theme
