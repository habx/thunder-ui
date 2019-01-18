import * as React from 'react'
import { withThunderContext } from '../context'

import BaseSection from './Section'
import SectionProps from './Section.interface'

const Section: React.StatelessComponent<SectionProps> = withThunderContext(BaseSection)

export default Section
