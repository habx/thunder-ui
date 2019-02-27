import * as React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { withKnobs, boolean, text, number } from '@storybook/addon-knobs'
import { filter, map } from 'lodash'
import { withState } from 'recompose'

import FontIcon from '../FontIcon'
import SpotlightItem from '../SpotlightItem'
import SpotlightWelcomeMessage from '../SpotlightWelcomeMessage'
import SpotlightSection from '../SpotlightSection'

import Spotlight from './index'
import { data, darkTheme } from './Spotlight.data'

import { searchInString } from '../_internal/strings'

const withQueryControl = withState('query', 'onQueryChange', 'france')

const BasicSection: React.StatelessComponent<any> = ({ query }) => (
  <React.Fragment>
    {map(
      filter(data.countries, country => searchInString(country, query)),
      (country: string, index) => <SpotlightItem key={country} title={country} index={index} />
    )}
  </React.Fragment>
)

storiesOf('Spotlight/spotlight options', module)
  .addDecorator(withKnobs)
  .add('full example', () => {
    const open = boolean('Open', true)
    const placeholder = text('Placeholder', 'Where do you want to go on holiday ?')

    return (
      <Spotlight open={open} placeholder={placeholder} data={data}>
        <SpotlightSection
          name='countries'
          filter={(query, country) => searchInString(country, query)}
          renderItem={(country, index) => <SpotlightItem key={country} title={country} index={index} />}
          maxItems={10}
        />
      </Spotlight>
    )
  })
  .add('basic uncontrolled', () => (
    <Spotlight open data={data}>
      <SpotlightSection
        name='countries'
        filter={(query, country) => searchInString(country, query)}
        renderItem={(country, index) => <SpotlightItem key={country} title={country} index={index} />}
      />
    </Spotlight>
  ))
  .add('basic controlled', () => {
    const ControlledSpotlight = withQueryControl(Spotlight)

    return (
      <ControlledSpotlight open data={data}>
        <SpotlightSection
          name='countries'
          filter={(query, country) => searchInString(country, query)}
          renderItem={(country, index) => <SpotlightItem key={country} title={country} index={index} />}
          maxItems={5}
        />
      </ControlledSpotlight>
    )
  })
  .add('with custom theme', () => (
    <Spotlight open data={data} theme={darkTheme}>
      <SpotlightSection
        name='countries'
        filter={(query, country) => searchInString(country, query)}
        renderItem={(country, index) => <SpotlightItem key={country} title={country} index={index} />}
      />
    </Spotlight>
  ))
  .add('with custom placeholder', () => (
    <Spotlight open data={data} placeholder='Where do you want to go on holiday ?'>
      <SpotlightSection
        name='countries'
        filter={(query, country) => searchInString(country, query)}
        renderItem={(country, index) => <SpotlightItem key={country} title={country} index={index} />}
      />
    </Spotlight>
  ))

storiesOf('Spotlight/section options', module)
  .addDecorator(withKnobs)
  .add('full example', () => {
    const maxItems = number('Max items', 5, { range: true, min: 0, max: 50, step: 1 })
    const title = text('Title', 'Countries')

    return (
      <Spotlight open data={data}>
        <SpotlightSection
          name='countries'
          filter={(query, country) => searchInString(country, query)}
          renderItem={(country, index) => <SpotlightItem key={country} title={country} index={index} />}
          maxItems={maxItems === 0 ? undefined : maxItems}
          title={title}
        />
      </Spotlight>
    )
  })
  .add('with 5 items max', () => (
    <Spotlight open data={data}>
      <SpotlightSection
        name='countries'
        filter={(query, country) => searchInString(country, query)}
        renderItem={(country, index) => <SpotlightItem key={country} title={country} index={index} />}
        maxItems={5}
      />
    </Spotlight>
  ))
  .add('with title', () => (
    <Spotlight open data={data}>
      <SpotlightSection
        name='countries'
        title='Countries'
        filter={(query, country) => searchInString(country, query)}
        renderItem={(country, index) => (
          <SpotlightItem
            key={country}
            title={country}
            index={index}
          />
        )}
        maxItems={5}
      />
    </Spotlight>
  ))
  .add('with custom section', () => (
    <Spotlight open data={data}>
      <SpotlightSection name='countries' render={props => <BasicSection {...props} />} />
    </Spotlight>
  ))

storiesOf('Spotlight/item options', module)
  .addDecorator(withKnobs)
  .add('full example', () => {
    const showIcons = boolean('Show icons', true)
    const showSubtitle = boolean('Show subtitles', true)

    return (
      <Spotlight open data={data}>
        <SpotlightSection
          name='countries'
          filter={(query, country) => searchInString(country, query)}
          renderItem={(country, index) => (
            <SpotlightItem
              key={country}
              title={country}
              index={index}
              icon={showIcons && <FontIcon icon='favorite' />}
              subtitle={showSubtitle && `Subtitle for ${country}`}
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
        name='countries'
        filter={(query, country) => searchInString(country, query)}
        renderItem={(country, index) => (
          <SpotlightItem
            key={country}
            title={country}
            index={index}
            icon={<FontIcon icon='favorite' />}
          />
        )}
        maxItems={5}
      />
    </Spotlight>
  ))
  .add('with subtitle', () => (
    <Spotlight open data={data}>
      <SpotlightSection
        name='countries'
        filter={(query, country) => searchInString(country, query)}
        renderItem={(country, index) => (
          <SpotlightItem
            key={country}
            title={country}
            index={index}
            icon={<FontIcon icon='favorite' />}
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
        name='countries'
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
        name='countries'
        filter={(query, country) => searchInString(country, query)}
        renderItem={(country, index) => (
          <SpotlightItem
            key={country}
            title={country}
            index={index}
            href='https://google.fr'
            target='_BLANK'
          />
        )}
        maxItems={5}
      />
    </Spotlight>
  ))
  .add('with onEdit and onDelete', () => (
    <Spotlight open data={data}>
      <SpotlightSection
        name='countries'
        filter={(query, country) => searchInString(country, query)}
        renderItem={(country, index) => (
          <SpotlightItem
            key={country}
            title={country}
            index={index}
            onEdit={action('Item edit')}
            onDelete={action('Item delete')}
          />
        )}
        maxItems={5}
      />
    </Spotlight>
  ))

storiesOf('Spotlight/welcome message', module)
  .add('basic', () => (
    <Spotlight open>
      <SpotlightWelcomeMessage>
        This is a welcome message on the Spotlight
      </SpotlightWelcomeMessage>
    </Spotlight>
  ))
