import * as React from 'react'

import { SpotlightContextProps } from './Spotlight.interface'

const SpotlightContext = React.createContext<SpotlightContextProps>(
  {} as SpotlightContextProps
)

export default SpotlightContext
