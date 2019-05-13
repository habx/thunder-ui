import * as React from 'react'

import { ListContextProps } from './List.interface'

const DEFAULT_CONTEXT = {}

const ListContext = React.createContext<ListContextProps>(
  DEFAULT_CONTEXT as ListContextProps
)

export default ListContext
