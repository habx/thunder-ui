import React, { Component, createContext, Fragment } from 'react'
import styled from 'styled-components'
import { storiesOf } from '@storybook/react'
import { take, takeRight, clone } from 'lodash'

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

const InputContainer = styled.div`
  padding-bottom: 16px;
`

const CountryArrayInputElement = ({ value, index }) => (
  <Context.Consumer>
    {({ onChange }) => (
      <Fragment>
        <InputContainer>
          <TextInput
            value={value.name}
            onChange={name => onChange({ ...value, name }, index)}
            label='City'
          />
        </InputContainer>
        <InputContainer>
          <TextInput
            value={value.country}
            onChange={country => onChange({ ...value, country }, index)}
            label='Country'
          />
        </InputContainer>
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

  handleReorder = (oldPosition, newPosition) => this.setState(prevState => {
    const items = clone(prevState.items)
    items.splice(newPosition > oldPosition ? newPosition + 1 : newPosition, 0, items[oldPosition])
    items.splice(newPosition > oldPosition ? oldPosition : oldPosition + 1, 1)

    return { items }
  })

  render() {
    const { items } = this.state

    return (
      <Container>
        <Context.Provider value={{ onChange: this.handleChange }}>
          <ArrayInput
            items={items}
            onAppend={this.handleAppend}
            onDelete={this.handleDelete}
            onReorder={this.handleReorder}
            itemComponent={CountryArrayInputElement}
            {...this.props}
          />
        </Context.Provider>
      </Container>
    )
  }
}

storiesOf('Inputs/ArrayInput', module)
  .add('basic', () => (
    <CountryArrayInput
      itemTitle={item => (item.name ? `${item.name} (${item.country})` : 'Empty element')}
    />
  ))
  .add('with description line', () => (
    <CountryArrayInput
      itemTitle={item => item.name}
      itemDescription={item => `Country: ${item.country}`}
    />
  ))
  .add('with order change allowed', () => (
    <CountryArrayInput
      itemTitle={item => (item.name ? `${item.name} (${item.country})` : 'Empty element')}
      canBeReordered
    />
  ))
  .add('with add button custom label', () => (
    <CountryArrayInput
      itemTitle={item => (item.name ? `${item.name} (${item.country})` : 'Empty element')}
      addButtonLabel='Add a city'
    />
  ))
