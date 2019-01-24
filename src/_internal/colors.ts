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

export const getMainColor = (props, propName = 'color') => {
  if (props[propName]) {
    return props[propName]
  }

  if (props.warning) {
    return colors.internationalOrange
  }

  if (props.error) {
    return colors.popstar
  }

  return colors.trueBlue
}

export const getHoverColor = (baseColor, props, propName = 'hoverColor') => {
  if (props[propName]) {
    return props[propName]
  }

  return color(baseColor).mix(color('#000'), 0.2)
}
