import color from 'color'

import colors from '../colors'

export const generateColorFromSeed = seed => {
  if (!seed) {
    return colors.trueBlue
  }

  const hash = seed.split('').reduce((acc, letter) => (
    letter.charCodeAt(0) + ((acc << 5) - acc)
  ), 0)

  const hashBase16 = (hash & 0x00ffffff).toString(16).toUpperCase()
  const rgbCode = '00000'.substring(0, 6 - hashBase16.length) + hashBase16

  return `#${rgbCode}`
}

export const getMainColor = (props, config: { propName?: string, themeKey?: string, customizable?: boolean } = {}) => {
  const { propName = 'color', themeKey = 'primary', customizable = true } = config

  if (customizable && props[propName]) {
    return props[propName]
  }

  const { warning, error, theme: { thunderUI = {} } = {} } = props

  if (warning) {
    return thunderUI.warning
  }

  if (error) {
    return thunderUI.error
  }

  if (themeKey === 'transparent') {
    return 'transparent'
  }

  return thunderUI[themeKey]
}

export const getHoverColor = (baseColor, props, propName = 'hoverColor') => {
  if (props[propName]) {
    return props[propName]
  }

  return color(baseColor).mix(color('#000'), 0.2).toString()
}
