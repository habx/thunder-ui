import memoize from 'lodash.memoize'
import * as React from 'react'

import { withSpotlightContext } from '../Spotlight/Spotlight.context'
import SpotlightSectionTitle from '../SpotlightSectionTitle'

import { SpotlightSectionContext } from './SpotlightSection.context'
import SpotlightSectionProps, {
  SpotlightSectionInnerProps,
} from './SpotlightSection.interface'
import { SectionContainer } from './SpotlightSection.style'

class BaseSpotlightSection extends React.Component<SpotlightSectionInnerProps> {
  getMatchingItems = () => {
    const { spotlight, filter, name } = this.props
    const sectionData = spotlight.data[name] || []

    if (filter) {
      return sectionData.filter((value, key, data) =>
        filter(spotlight.query, value, key, data)
      )
    }

    return sectionData
  }

  buildContext = memoize(name => ({ name }))

  renderContent() {
    const { render, spotlight, renderItem, name, maxItems } = this.props

    if (render) {
      return render(spotlight)
    }

    if (renderItem && spotlight.data && name) {
      const items = this.getMatchingItems()

      const limitItems =
        maxItems > -1 && items.length > maxItems
          ? items.slice(0, maxItems)
          : items

      return limitItems.map(renderItem)
    }

    return null
  }

  render() {
    const { title, name } = this.props

    return (
      <SpotlightSectionContext.Provider value={this.buildContext(name)}>
        <SectionContainer>
          {title && <SpotlightSectionTitle>{title}</SpotlightSectionTitle>}
          {this.renderContent()}
        </SectionContainer>
      </SpotlightSectionContext.Provider>
    )
  }
}

const SpotlightSection: React.StatelessComponent<
  SpotlightSectionProps
> = withSpotlightContext(BaseSpotlightSection)

export default SpotlightSection
