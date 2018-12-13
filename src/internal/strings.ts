import { flow, lowerCase, trim, deburr } from 'lodash'
import { replace } from 'lodash/fp'

const formatString = flow([lowerCase, trim, deburr, replace(/\s/g, '')])

export const searchInString = (s: string, search: string) =>
  formatString(s).includes(formatString(search))
