import { flow, lowerCase, trim, deburr } from 'lodash'

const formatString = flow([lowerCase, trim, deburr])

export const searchInString = (string, search) =>
  formatString(string).includes(formatString(search))

