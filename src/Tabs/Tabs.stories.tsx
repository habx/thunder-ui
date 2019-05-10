import { withKnobs, number } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'
import * as React from 'react'

import TabsItem from '../TabsItem'
import TabsSection from '../TabsSection'
import TabsSeparator from '../TabsSeparator'

import Tabs from './index'

storiesOf('Navigation|Tabs', module)
  .addDecorator(withKnobs)
  .add('full example', () => {
    const active = number('Active slide', 1, {
      range: true,
      min: 0,
      max: 6,
      step: 1,
    })

    return (
      <Tabs>
        <TabsSection>
          <TabsItem active={active === 0}>Home</TabsItem>
          <TabsItem active={active === 1}>Favorites</TabsItem>
          <TabsItem active={active === 2}>Trends</TabsItem>
          <TabsItem active={active === 3}>Best</TabsItem>
        </TabsSection>
        <TabsSection label="Categories">
          <TabsItem active={active === 4}>News</TabsItem>
          <TabsSeparator />
          <TabsItem active={active === 5}>Computer Science</TabsItem>
          <TabsItem active={active === 6}>Miscellaneous</TabsItem>
        </TabsSection>
      </Tabs>
    )
  })
  .add('with scroll', () => {
    const active = number('Active slide', 1, {
      range: true,
      min: 0,
      max: 6,
      step: 1,
    })

    return (
      <Tabs>
        <TabsSection style={{ maxWidth: 200 }}>
          <TabsItem active={active === 0}>Home</TabsItem>
          <TabsItem active={active === 1}>Favorites</TabsItem>
          <TabsItem active={active === 2}>Trends</TabsItem>
          <TabsItem active={active === 3}>Best</TabsItem>
        </TabsSection>
        <TabsSection label="Categories">
          <TabsItem active={active === 4}>News</TabsItem>
          <TabsSeparator />
          <TabsItem active={active === 5}>Computer Science</TabsItem>
          <TabsItem active={active === 6}>Miscellaneous</TabsItem>
        </TabsSection>
      </Tabs>
    )
  })
