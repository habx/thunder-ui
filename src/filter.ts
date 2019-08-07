import { pick } from './_internal/data'
import { searchInString } from './_internal/strings'

export default {
  some: (...keys: string[]) => (query: string, object: any) => {
    if (!object) {
      return false
    }

    return Object.values(pick(object, keys)).some((value: string) =>
      searchInString(value, query)
    )
  },
}
