import * as React from 'react'
import { get, map, take, memoize, filter as lodashFilter } from 'lodash'

import SpotlightSectionTitle from '../SpotlightSectionTitle'
import { withSpotlightContext } from '../Spotlight/Spotlight.context'

import SpotlightSectionProps, { SpotlightSectionInnerProps } from './SpotlightSection.interface'
import { SectionContainer } from './SpotlightSection.style'
import { SpotlightSectionContext } from './SpotlightSection.context'

class BaseSpotlightSection extends React.Component<SpotlightSectionInnerProps> {
  getMatchingItems = () => {
    const { spotlight, filter, name } = this.props
    const sectionData = get(spotlight.data, name)

    if (filter) {
      return lodashFilter(
        sectionData,
        (...args) => filter(spotlight.query, ...args)
      )
    }

    return sectionData
  }

  buildContext = memoize(name => ({ name }))

  renderContent () {
    const { render, spotlight, renderItem, name, maxItems } = this.props

    if (render) {
      return render(spotlight)
    }

    if (renderItem && spotlight.data && name) {
      const items = this.getMatchingItems()

      const limitItems = maxItems > -1 ? take(items, maxItems) : items

      return map(limitItems, renderItem)
    }

    return null
  }

  render () {
    const { title, name } = this.props

    return (
      <SpotlightSectionContext.Provider value={this.buildContext(name)}>
        <SectionContainer>
          { title && <SpotlightSectionTitle>{ title }</SpotlightSectionTitle>}
          { this.renderContent() }
        </SectionContainer>
      </SpotlightSectionContext.Provider>
    )
  }
}

const SpotlightSection: React.StatelessComponent<SpotlightSectionProps> = withSpotlightContext(BaseSpotlightSection)

export default SpotlightSection
