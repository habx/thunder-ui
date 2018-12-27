import { colors } from '../theme'

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
