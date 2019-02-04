import * as React from 'react'
import ThunderProvider from '../src/ThunderProvider'

export default storyFn => (
  <ThunderProvider>
    {storyFn()}
  </ThunderProvider>
)
