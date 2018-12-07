import { flow, lowerCase, trim, deburr } from 'lodash'
import { replace } from 'lodash/fp'

const formatString = flow([lowerCase, trim, deburr, replace(/\s/g, '')])

export const searchInString = (string, search) =>
  formatString(string).includes(formatString(search))

