import { isFunction } from '../_internal/data'
import { themeAccessor } from '../_internal/types'
import colors from '../colors'
import shadows from '../shadows'
import { ThunderUITheme } from '../useTheme'

const BASE_THEME = {
  error: colors.popstar,
  warning: colors.internationalOrange,
}

const LIGHT_THEME = {
  ...BASE_THEME,

  name: 'light',

  primaryLighter: colors.platinium,
  primaryLight: colors.brightCerualean,
  primary: colors.trueBlue,

  neutralLightest: colors.white,
  neutralLighter: colors.snow,
  neutralLight: colors.gainsboro,
  neutral: colors.paynesGrey,
  neutralStronger: colors.maastrichtBlue,

  shadowLight: shadows.light,
  shadow: shadows.medium,
  shadowStrong: shadows.strong,
}

const DARK_THEME = {
  ...BASE_THEME,

  name: 'dark',

  primary: '#06d1c2',

  neutralLightest: '#07234f',
  neutralLighter: '#082554',
  neutralLight: '#294975',
  neutral: '#fff',
  neutralStronger: '#fff',

  shadowLight: '0 2px 6px 0 rgba(0, 13, 27, 0.6)',
  shadow: '0 2px 6px 0 rgba(0, 13, 27, 0.7)',
  shadowStrong: '0 3px 9px 0 rgba(0, 13, 27, 0.7)',
}

const getter = (
  themeKey: string,
  config: { propName?: string; dynamic?: boolean } = {}
): themeAccessor => {
  const { propName = 'color', dynamic = false } = config

  return (props, runtimeConfig: { isRecursive?: boolean } = {}) => {
    const { theme = {} as { thunderUI: ThunderUITheme } } = props
    const thunderTheme = theme.thunderUI

    if (propName && props[propName] && !runtimeConfig.isRecursive) {
      if (isFunction(props[propName])) {
        return props[propName](props, { isRecursive: true })
      }

      return props[propName]
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

const theme = {
  get: getter,
  light: LIGHT_THEME,
  dark: DARK_THEME,
}

export default theme
