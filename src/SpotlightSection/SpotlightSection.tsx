import * as React from 'react'

import SpotlightContext from '../Spotlight/Spotlight.context'
import SpotlightSectionTitle from '../SpotlightSectionTitle'

import SpotlightSectionContext from './SpotlightSection.context'
import SpotlightSectionProps from './SpotlightSection.interface'
import { SectionContainer } from './SpotlightSection.style'

const SpotlightSection = React.forwardRef<
  HTMLDivElement,
  SpotlightSectionProps
>((props, ref) => {
  const {
    title,
    name,
    filter,
    render,
    renderItem,
    maxItems = -1,
    ...rest
  } = props

  const spotlight = React.useContext(SpotlightContext)

  const context = React.useMemo(() => ({ name }), [name])

  const content = React.useMemo(() => {
    const getMatchingItems = () => {
      const sectionData = spotlight.data[name] || []

      if (filter) {
        return sectionData.filter((value, key, data) =>
          filter(spotlight.query, value, key, data)
        )
      }

      return sectionData
    }

    if (render) {
      return render(spotlight)
    }

    if (renderItem && spotlight.data && name) {
      const items = getMatchingItems()

      const limitItems =
        maxItems > -1 && items.length > maxItems
          ? items.slice(0, maxItems)
          : items

      return limitItems.map(renderItem)
    }

    return null
  }, [filter, maxItems, name, render, renderItem, spotlight])

  return (
    <SpotlightSectionContext.Provider value={context}>
      <SectionContainer {...rest} ref={ref}>
        {title && <SpotlightSectionTitle>{title}</SpotlightSectionTitle>}
        {content}
      </SectionContainer>
    </SpotlightSectionContext.Provider>
  )
})

export default SpotlightSection
