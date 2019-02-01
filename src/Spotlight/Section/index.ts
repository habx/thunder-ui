import * as React from 'react'
import { withSpotlightContext } from '../context'

import BaseSection from './Section'
import SectionProps from './Section.interface'

const Section: React.StatelessComponent<SectionProps> = withSpotlightContext(BaseSection)

export default Section
