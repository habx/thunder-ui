import React from 'react'
import { storiesOf } from '@storybook/react'
import { filter, map } from 'lodash'
import { withState } from 'recompose'

import FontIcon from '../FontIcon'
import { Thunder, Section, Item } from './index'

import { searchInString } from '../../internal/strings'

const data = {
  countries: ['Afghanistan', 'Albania', 'Algeria', 'Andorra', 'Angola', 'Anguilla', 'Antigua &amp; Barbuda', 'Argentina', 'Armenia', 'Aruba', 'Australia', 'Austria', 'Azerbaijan', 'Bahamas', 'Bahrain', 'Bangladesh', 'Barbados', 'Belarus', 'Belgium', 'Belize', 'Benin', 'Bermuda', 'Bhutan', 'Bolivia', 'Bosnia &amp; Herzegovina', 'Botswana', 'Brazil', 'British Virgin Islands', 'Brunei', 'Bulgaria', 'Burkina Faso', 'Burundi', 'Cambodia', 'Cameroon', 'Cape Verde', 'Cayman Islands', 'Chad', 'Chile', 'China', 'Colombia', 'Congo', 'Cook Islands', 'Costa Rica', 'Cote D Ivoire', 'Croatia', 'Cruise Ship', 'Cuba', 'Cyprus', 'Czech Republic', 'Denmark', 'Djibouti', 'Dominica', 'Dominican Republic', 'Ecuador', 'Egypt', 'El Salvador', 'Equatorial Guinea', 'Estonia', 'Ethiopia', 'Falkland Islands', 'Faroe Islands', 'Fiji', 'Finland', 'France', 'French Polynesia', 'French West Indies', 'Gabon', 'Gambia', 'Georgia', 'Germany', 'Ghana', 'Gibraltar', 'Greece', 'Greenland', 'Grenada', 'Guam', 'Guatemala', 'Guernsey', 'Guinea', 'Guinea Bissau', 'Guyana', 'Haiti', 'Honduras', 'Hong Kong', 'Hungary', 'Iceland', 'India', 'Indonesia', 'Iran', 'Iraq', 'Ireland', 'Isle of Man', 'Israel', 'Italy', 'Jamaica', 'Japan', 'Jersey', 'Jordan', 'Kazakhstan', 'Kenya', 'Kuwait', 'Kyrgyz Republic', 'Laos', 'Latvia', 'Lebanon', 'Lesotho', 'Liberia', 'Libya', 'Liechtenstein', 'Lithuania', 'Luxembourg', 'Macau', 'Macedonia', 'Madagascar', 'Malawi', 'Malaysia', 'Maldives', 'Mali', 'Malta', 'Mauritania', 'Mauritius', 'Mexico', 'Moldova', 'Monaco', 'Mongolia', 'Montenegro', 'Montserrat', 'Morocco', 'Mozambique', 'Namibia', 'Nepal', 'Netherlands', 'Netherlands Antilles', 'New Caledonia', 'New Zealand', 'Nicaragua', 'Niger', 'Nigeria', 'Norway', 'Oman', 'Pakistan', 'Palestine', 'Panama', 'Papua New Guinea', 'Paraguay', 'Peru', 'Philippines', 'Poland', 'Portugal', 'Puerto Rico', 'Qatar', 'Reunion', 'Romania', 'Russia', 'Rwanda', 'Saint Pierre &amp; Miquelon', 'Samoa', 'San Marino', 'Satellite', 'Saudi Arabia', 'Senegal', 'Serbia', 'Seychelles', 'Sierra Leone', 'Singapore', 'Slovakia', 'Slovenia', 'South Africa', 'South Korea', 'Spain', 'Sri Lanka', 'St Kitts &amp; Nevis', 'St Lucia', 'St Vincent', 'St. Lucia', 'Sudan', 'Suriname', 'Swaziland', 'Sweden', 'Switzerland', 'Syria', 'Taiwan', 'Tajikistan', 'Tanzania', 'Thailand', 'Timor L\'Este', 'Togo', 'Tonga', 'Trinidad &amp; Tobago', 'Tunisia', 'Turkey', 'Turkmenistan', 'Turks &amp; Caicos', 'Uganda', 'Ukraine', 'United Arab Emirates', 'United Kingdom', 'Uruguay', 'Uzbekistan', 'Venezuela', 'Vietnam', 'Virgin Islands (US)', 'Yemen', 'Zambia', 'Zimbabwe'],
}

const withQueryControl = withState('query', 'onQueryChange', 'france')

const BasicSection = ({ query }) => map(
  filter(data.countries, country => searchInString(country, query)),
  (country, index) => <Item key={country} title={country} href='#' index={index} />
)

storiesOf('Thunder', module)
  .add('basic uncontrolled', () => (
    <Thunder open data={data}>
      <Section
        name='countries'
        filter={(query, country) => searchInString(country, query)}
        renderItem={(country, index) => <Item key={country} title={country} href='#' index={index} />}
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
          renderItem={(country, index) => <Item key={country} title={country} href='#' index={index} />}
          maxItems={5}
        />
      </ControlledThunder>
    )
  })
  .add('with 5 items max', () => (
    <Thunder open data={data}>
      <Section
        name='countries'
        filter={(query, country) => searchInString(country, query)}
        renderItem={(country, index) => <Item key={country} title={country} href='#' index={index} />}
        maxItems={5}
      />
    </Thunder>
  ))
  .add('with icons on items', () => (
    <Thunder open data={data}>
      <Section
        name='countries'
        filter={(query, country) => searchInString(country, query)}
        renderItem={(country, index) => (
          <Item
            key={country}
            title={country}
            href='#'
            index={index}
            icon={<FontIcon icon='envelope' />}
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
