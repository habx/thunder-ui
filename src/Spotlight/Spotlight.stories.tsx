import * as React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { filter, map } from 'lodash'
import { withState } from 'recompose'

import FontIcon from '../FontIcon'
import { Spotlight, Section, Item, WelcomeMessage } from '.'
import { data, darkTheme } from './Spotlight.data'

import { searchInString } from '../../_internal/strings'

const withQueryControl = withState('query', 'onQueryChange', 'france')

const BasicSection: React.StatelessComponent<any> = ({ query }) => (
  <React.Fragment>
    {map(
      filter(data.countries, country => searchInString(country, query)),
      (country: string, index) => <Item key={country} title={country} index={index} />
    )}
  </React.Fragment>
)

storiesOf('Spotlight/spotlight options', module)
  .add('basic uncontrolled', () => (
    <Spotlight open data={data}>
      <Section
        name='countries'
        filter={(query, country) => searchInString(country, query)}
        renderItem={(country, index) => <Item key={country} title={country} index={index} />}
      />
    </Spotlight>
  ))
  .add('basic controlled', () => {
    const ControlledSpotlight = withQueryControl(Spotlight)

    return (
      <ControlledSpotlight open data={data}>
        <Section
          name='countries'
          filter={(query, country) => searchInString(country, query)}
          renderItem={(country, index) => <Item key={country} title={country} index={index} />}
          maxItems={5}
        />
      </ControlledSpotlight>
    )
  })
  .add('with custom theme', () => (
    <Spotlight open data={data} theme={darkTheme}>
      <Section
        name='countries'
        filter={(query, country) => searchInString(country, query)}
        renderItem={(country, index) => <Item key={country} title={country} index={index} />}
      />
    </Spotlight>
  ))
  .add('with custom placeholder', () => (
    <Spotlight open data={data} placeholder='Where do you want to go on holiday ?'>
      <Section
        name='countries'
        filter={(query, country) => searchInString(country, query)}
        renderItem={(country, index) => <Item key={country} title={country} index={index} />}
      />
    </Spotlight>
  ))

storiesOf('Spotlight/section options', module)
  .add('with 5 items max', () => (
    <Spotlight open data={data}>
      <Section
        name='countries'
        filter={(query, country) => searchInString(country, query)}
        renderItem={(country, index) => <Item key={country} title={country} index={index} />}
        maxItems={5}
      />
    </Spotlight>
  ))
  .add('with title', () => (
    <Spotlight open data={data}>
      <Section
        name='countries'
        title='Countries'
        filter={(query, country) => searchInString(country, query)}
        renderItem={(country, index) => (
          <Item
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
      <Section name='countries' render={props => <BasicSection {...props} />} />
    </Spotlight>
  ))

storiesOf('Spotlight/item options', module)
  .add('with icons', () => (
    <Spotlight open data={data}>
      <Section
        name='countries'
        filter={(query, country) => searchInString(country, query)}
        renderItem={(country, index) => (
          <Item
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
      <Section
        name='countries'
        filter={(query, country) => searchInString(country, query)}
        renderItem={(country, index) => (
          <Item
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
      <Section
        name='countries'
        filter={(query, country) => searchInString(country, query)}
        renderItem={(country, index) => (
          <Item
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
      <Section
        name='countries'
        filter={(query, country) => searchInString(country, query)}
        renderItem={(country, index) => (
          <Item
            key={country}
            title={country}
            index={index}
            href='https://habx.fr'
            target='_BLANK'
          />
        )}
        maxItems={5}
      />
    </Spotlight>
  ))
  .add('with onEdit and onDelete', () => (
    <Spotlight open data={data}>
      <Section
        name='countries'
        filter={(query, country) => searchInString(country, query)}
        renderItem={(country, index) => (
          <Item
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
      <WelcomeMessage>
        This is a welcome message on the Spotlight
      </WelcomeMessage>
    </Spotlight>
  ))
