import * as React from 'react'
import { get, map, take, memoize, filter as lodashFilter } from 'lodash'

import { SectionContext } from '../context'
import SpotlightSectionTitle from '../SpotlightSectionTitle'

import { SpotlightSectionInnerProps } from './SpotlightSection.interface'
import { SectionContainer } from './SpotlightSection.style'

class SpotlightSection extends React.Component<SpotlightSectionInnerProps> {
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
      <SectionContext.Provider value={this.buildContext(name)}>
        <SectionContainer>
          { title && <SpotlightSectionTitle>{ title }</SpotlightSectionTitle>}
          { this.renderContent() }
        </SectionContainer>
      </SectionContext.Provider>
    )
  }
}

export default SpotlightSection
