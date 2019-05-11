import * as React from 'react'

import { SpotlightSectionContextProps } from './SpotlightSection.interface'

const SpotlightSectionContext = React.createContext<
  SpotlightSectionContextProps
>({} as SpotlightSectionContextProps)

export default SpotlightSectionContext
