import * as React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { filter, map } from 'lodash'
import { withState } from 'recompose'

import FontIcon from '../FontIcon'
import { Thunder, Section, Item, WelcomeMessage } from './index'
import { data, darkTheme } from './Thunder.data'

import { searchInString } from '../internal/strings'

const withQueryControl = withState('query', 'onQueryChange', 'france')

const BasicSection: React.StatelessComponent<any> = ({ query }) => (
  <React.Fragment>
    {map(
      filter(data.countries, country => searchInString(country, query)),
      (country, index) => <Item key={country} title={country} index={index} />
    )}
  </React.Fragment>
)

storiesOf('Thunder/thunder options', module)
  .add('basic uncontrolled', () => (
    <Thunder open data={data}>
      <Section
        name='countries'
        filter={(query, country) => searchInString(country, query)}
        renderItem={(country, index) => <Item key={country} title={country} index={index} />}
      />
    </Thunder>
  ))
  .add('basic controlled', () => {
    const ControlledThunder = withQueryControl(Thunder)

    return (
      <ControlledThunder open data={data}>
        <Section
          name='countries'
          filter={(query, country) => searchInString(country, query)}
          renderItem={(country, index) => <Item key={country} title={country} index={index} />}
          maxItems={5}
        />
      </ControlledThunder>
    )
  })
  .add('with custom theme', () => (
    <Thunder open data={data} theme={darkTheme}>
      <Section
        name='countries'
        filter={(query, country) => searchInString(country, query)}
        renderItem={(country, index) => <Item key={country} title={country} index={index} />}
      />
    </Thunder>
  ))
  .add('with custom placeholder', () => (
    <Thunder open data={data} placeholder='Where do you want to go on holiday ?'>
      <Section
        name='countries'
        filter={(query, country) => searchInString(country, query)}
        renderItem={(country, index) => <Item key={country} title={country} index={index} />}
      />
    </Thunder>
  ))

storiesOf('Thunder/section options', module)
  .add('with 5 items max', () => (
    <Thunder open data={data}>
      <Section
        name='countries'
        filter={(query, country) => searchInString(country, query)}
        renderItem={(country, index) => <Item key={country} title={country} index={index} />}
        maxItems={5}
      />
    </Thunder>
  ))
  .add('with title', () => (
    <Thunder open data={data}>
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
    </Thunder>
  ))
  .add('with custom section', () => (
    <Thunder open data={data}>
      <Section name='countries' render={props => <BasicSection {...props} />} />
    </Thunder>
  ))

storiesOf('Thunder/item options', module)
  .add('with icons', () => (
    <Thunder open data={data}>
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
    </Thunder>
  ))
  .add('with subtitle', () => (
    <Thunder open data={data}>
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
    </Thunder>
  ))
  .add('with custom onClick', () => (
    <Thunder open data={data}>
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
    </Thunder>
  ))
  .add('with href', () => (
    <Thunder open data={data}>
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
    </Thunder>
  ))
  .add('with onEdit and onDelete', () => (
    <Thunder open data={data}>
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
    </Thunder>
  ))

storiesOf('Thunder/welcome message', module)
  .add('basic', () => (
    <Thunder open>
      <WelcomeMessage>
        This is a welcome message on the Thunder
      </WelcomeMessage>
    </Thunder>
  ))
