import React, { Component, createContext, Fragment } from 'react'
import styled from 'styled-components'
import { storiesOf } from '@storybook/react'
import { take, takeRight } from 'lodash'

import ArrayInput from './index'
import TextInput from '../TextInput'


const FIELDS = [
  { name: 'Paris', country: 'France' },
  { name: 'London', country: 'United Kingdom' },
  { name: 'Madrid', country: 'Spain' },
]

const DEFAULT_FIELD = { name: '', country: '' }

const Context = createContext({})

const Container = styled.div`
  width: 600px;
`

const CountryArrayInputElement = ({ value, index }) => (
  <Context.Consumer>
    {({ onChange }) => (
      <Fragment>
        <TextInput
          value={value.name}
          onChange={name => onChange({ ...value, name }, index)}
          label='City'
        />
        <TextInput
          value={value.country}
          onChange={country => onChange({ ...value, country }, index)}
          label='Country'
        />
      </Fragment>
    )}
  </Context.Consumer>
)

class CountryArrayInput extends Component {
  state = {
    items: FIELDS,
  }

  handleChange = (value, index) => this.setState(({ items }) => ({
    items: [...take(items, index), value, ...takeRight(items, items.length - index - 1)],
  }))

  handleAppend = () => this.setState(({ items }) => ({ items: [...items, DEFAULT_FIELD] }))

  handleDelete = index => this.setState(({ items }) => ({
    items: [...take(items, index), ...takeRight(items, items.length - index - 1)],
  }))

  render() {
    const { items } = this.state

    return (
      <Container>
        <Context.Provider value={{ onChange: this.handleChange }}>
          <ArrayInput
            {...this.props}
            items={items}
            onAppend={this.handleAppend}
            onDelete={this.handleDelete}
          />
        </Context.Provider>
      </Container>
    )
  }
}

storiesOf('ArrayInput', module)
  .add('basic', () => (
    <CountryArrayInput
      items={FIELDS}
      itemTitle={item => (item.name ? `${item.name} (${item.country})` : 'Empty element')}
      itemComponent={CountryArrayInputElement}
    />
  ))
