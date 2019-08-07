import { action } from '@storybook/addon-actions'
import { withKnobs, boolean, text, number } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'
import * as React from 'react'

import { searchInString } from '../_internal/strings'
import FontIcon from '../FontIcon'
import SpotlightItem from '../SpotlightItem'
import SpotlightSection from '../SpotlightSection'
import SpotlightWelcomeMessage from '../SpotlightWelcomeMessage'

import Spotlight from './index'
import { data } from './Spotlight.data'

const BasicSection: React.FunctionComponent<any> = ({ query }) => (
  <React.Fragment>
    {data.countries
      .filter(country => searchInString(country, query))
      .map((country: string, index) => (
        <SpotlightItem key={country} title={country} index={index} />
      ))}
  </React.Fragment>
)

storiesOf('Spotlight|Spotlight', module)
  .addDecorator(withKnobs)
  .add('full example', () => {
    const open = boolean('Open', true)
    const placeholder = text(
      'Placeholder',
      'Where do you want to go on holiday ?'
    )

    return (
      <Spotlight open={open} placeholder={placeholder} data={data}>
        <SpotlightSection
          name="countries"
          filter={(query, country) => searchInString(country, query)}
          renderItem={(country, index) => (
            <SpotlightItem key={country} title={country} index={index} />
          )}
          maxItems={10}
        />
      </Spotlight>
    )
  })
  .add('basic', () => (
    <Spotlight open data={data}>
      <SpotlightSection
        name="countries"
        filter={(query, country) => searchInString(country, query)}
        renderItem={(country, index) => (
          <SpotlightItem key={country} title={country} index={index} />
        )}
      />
    </Spotlight>
  ))
  .add('with custom placeholder', () => (
    <Spotlight
      open
      data={data}
      placeholder="Where do you want to go on holiday ?"
    >
      <SpotlightSection
        name="countries"
        filter={(query, country) => searchInString(country, query)}
        renderItem={(country, index) => (
          <SpotlightItem key={country} title={country} index={index} />
        )}
      />
    </Spotlight>
  ))

storiesOf('Spotlight|SpotlightSection', module)
  .addDecorator(withKnobs)
  .add('full example', () => {
    const maxItems = number('Max items', 5, {
      range: true,
      min: 0,
      max: 50,
      step: 1,
    })
    const title = text('Title', 'Countries')

    return (
      <Spotlight open data={data}>
        <SpotlightSection
          name="countries"
          filter={(query, country) => searchInString(country, query)}
          renderItem={(country, index) => (
            <SpotlightItem key={country} title={country} index={index} />
          )}
          maxItems={maxItems === 0 ? undefined : maxItems}
          title={title}
        />
      </Spotlight>
    )
  })
  .add('with 5 items max', () => (
    <Spotlight open data={data}>
      <SpotlightSection
        name="countries"
        filter={(query, country) => searchInString(country, query)}
        renderItem={(country, index) => (
          <SpotlightItem key={country} title={country} index={index} />
        )}
        maxItems={5}
      />
    </Spotlight>
  ))
  .add('with title', () => (
    <Spotlight open data={data}>
      <SpotlightSection
        name="countries"
        title="Countries"
        filter={(query, country) => searchInString(country, query)}
        renderItem={(country, index) => (
          <SpotlightItem key={country} title={country} index={index} />
        )}
        maxItems={5}
      />
    </Spotlight>
  ))
  .add('with custom section', () => (
    <Spotlight open data={data}>
      <SpotlightSection
        name="countries"
        render={props => <BasicSection {...props} />}
      />
    </Spotlight>
  ))

storiesOf('Spotlight|SpotlightItem', module)
  .addDecorator(withKnobs)
  .add('full example', () => {
    const showIcons = boolean('Show icons', true)
    const showSubtitle = boolean('Show subtitles', true)

    return (
      <Spotlight open data={data}>
        <SpotlightSection
          name="countries"
          filter={(query, country) => searchInString(country, query)}
          renderItem={(country, index) => (
            <SpotlightItem
              key={country}
              title={country}
              index={index}
              icon={showIcons && <FontIcon icon="favorite" />}
              subtitle={showSubtitle ? `Subtitle for ${country}` : ''}
            />
          )}
          maxItems={5}
        />
      </Spotlight>
    )
  })
  .add('with icons', () => (
    <Spotlight open data={data}>
      <SpotlightSection
        name="countries"
        filter={(query, country) => searchInString(country, query)}
        renderItem={(country, index) => (
          <SpotlightItem
            key={country}
            title={country}
            index={index}
            icon={<FontIcon icon="favorite" />}
          />
        )}
        maxItems={5}
      />
    </Spotlight>
  ))
  .add('with subtitle', () => (
    <Spotlight open data={data}>
      <SpotlightSection
        name="countries"
        filter={(query, country) => searchInString(country, query)}
        renderItem={(country, index) => (
          <SpotlightItem
            key={country}
            title={country}
            index={index}
            icon={<FontIcon icon="favorite" />}
            subtitle={`Subtitle for ${country}`}
          />
        )}
        maxItems={5}
      />
    </Spotlight>
  ))
  .add('with custom onClick', () => (
    <Spotlight open data={data}>
      <SpotlightSection
        name="countries"
        filter={(query, country) => searchInString(country, query)}
        renderItem={(country, index) => (
          <SpotlightItem
            key={country}
            title={country}
            index={index}
            onClick={action('Item click')}
          />
        )}
        maxItems={5}
      />
    </Spotlight>
  ))
  .add('with href', () => (
    <Spotlight open data={data}>
      <SpotlightSection
        name="countries"
        filter={(query, country) => searchInString(country, query)}
        renderItem={(country, index) => (
          <SpotlightItem
            key={country}
            title={country}
            index={index}
            href="https://google.fr"
            target="_BLANK"
          />
        )}
        maxItems={5}
      />
    </Spotlight>
  ))
  .add('with onEdit and onDelete', () => (
    <Spotlight open data={data}>
      <SpotlightSection
        name="countries"
        filter={(query, country) => searchInString(country, query)}
        renderItem={(country, index) => (
          <SpotlightItem
            key={country}
            title={country}
            index={index}
            onEdit={action('Item edit')}
            onDelete={action('Item delete')}
            onClick={action('Item click')}
          />
        )}
        maxItems={5}
      />
    </Spotlight>
  ))

storiesOf('Spotlight|SpotlightWelcomeMessage', module).add('basic', () => (
  <Spotlight open>
    <SpotlightWelcomeMessage>
      This is a welcome message on the Spotlight
    </SpotlightWelcomeMessage>
  </Spotlight>
))
