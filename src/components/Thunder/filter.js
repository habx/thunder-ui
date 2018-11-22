import { some as lodashSome, pick } from 'lodash'

import { searchInString} from '../../internal/strings'

export const some = (...keys) => (query, object) => (
  lodashSome(pick(object, keys), value => searchInString(value, query))
)
